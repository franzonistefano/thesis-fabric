pragma solidity >=0.4.0 <0.7.0; //0.4.24;

contract BoxPoints {

    // model a user
    struct User {
        address userAddress;
        string firstName;
        string lastName;
        string email;
        uint points;
        bool isRegistered;
        uint numTransaction;
        mapping(uint => PointsTransaction) userTransactions;
        uint numBox;
        mapping(uint => ClothesBox) box;
    }

    // model a admin
    struct Admin {
        address adminAddress;
        string name;
        bool isRegistered;
    }

    // model points transaction
    enum TransactionType { Earned, Redeemed }
    struct PointsTransaction {
        uint points;
        TransactionType transactionType;
        address userAddress;
        address adminAddress;
    }
    
    //model clothing box
    enum ClothesType { Tshirt, Pants, Jacket, Other}
    struct Clothes {
        ClothesType clothesType;
        uint qta;
    }
    
    struct ClothesBox {
        address userAddress;
        //mapping(uint => Clothes) clothes;
        //Clothes[] clothes;
        uint tshirt;
        uint pants;
        uint jacket; 
        uint other;
        bool isEvaluated;
        uint points;
    }

    //users and admins on the network mapped with their address
    mapping(address => User) public users;
    mapping(address => Admin) public admins;
    
    //transactions
    mapping(uint => PointsTransaction) private usersTransactions;
    uint totTx;
    
    //public transactions and admins information
    Admin[] public adminsInfo;
    PointsTransaction[] public transactionsInfo;
    
    //Pending Requests
    mapping(uint => ClothesBox) pendingBox;
    uint public pendingIndex;
    
    //Evaluated Requests
    mapping(uint => ClothesBox) evaluatedBox;
    uint public evaluatedIndex;
    

    //register sender as user
    function registerUser (string _firstName, string _lastName, string _email) public {
      //check msg.sender in existing users
      require(!users[msg.sender].isRegistered, "Account already registered as User");
 
      //check msg.sender in existing admins
      require(!admins[msg.sender].isRegistered, "Account already registered as Admin");

      //add user account
      users[msg.sender] = User(msg.sender, _firstName, _lastName, _email, 0, true, 0, 0); 
    }

    //register sender as admin
    function registerAdmin (string _name) public {
      //check msg.sender in existing users
      require(!users[msg.sender].isRegistered, "Account already registered as Users");

      //check msg.sender in existing admins
      require(!admins[msg.sender].isRegistered, "Account already registered as Admin");

      //add admin account
      admins[msg.sender] = Admin(msg.sender, _name, true);

      //add admin info to be shared with users
      adminsInfo.push(Admin(msg.sender, _name, true));

    }
    
    //get User Data
    function getUserData (address _userAddress) public view returns(address userAddress, string firstName, string lastName, string email, uint points, bool isRegistered, uint numTransaction) {
      //check msg.sender in existing admins
      require(admins[msg.sender].isRegistered, "Admin not found");
      
      //check msg.sender in existing users
      require(users[_userAddress].isRegistered, "User not found");
    
      return (users[_userAddress].userAddress, users[_userAddress].firstName, users[_userAddress].lastName, users[_userAddress].email, users[_userAddress].points, users[_userAddress].isRegistered, users[_userAddress].numTransaction);
    }
    

    //update users with points earned
    function earnPoints (uint _points, address _userAddress ) internal {
      // only admin can call
      require(admins[msg.sender].isRegistered, "Sender not registered as Admin");

      // verify user address
      require(users[_userAddress].isRegistered, "User address not found");

      // update user account
      users[_userAddress].points = users[_userAddress].points + _points;

      PointsTransaction memory earnTx = PointsTransaction({
        points: _points,
        transactionType: TransactionType.Earned,
        userAddress: _userAddress,
        adminAddress: admins[msg.sender].adminAddress
      });
      
      // add transction
      transactionsInfo.push(earnTx);
      
      users[_userAddress].userTransactions[users[_userAddress].numTransaction] = earnTx;
      users[_userAddress].numTransaction++;
      
      usersTransactions[totTx] = earnTx;
      totTx++;
      
    }
    

    //Update users with points used
    function usePoints (uint _points) public {
      // only users can call
      require(users[msg.sender].isRegistered, "User not registered");

      // verify enough points for user
      require(users[msg.sender].points >= _points, "Insufficient points");

      // update user account
      users[msg.sender].points = users[msg.sender].points - _points;

      PointsTransaction memory spendTx = PointsTransaction({
        points: _points,
        transactionType: TransactionType.Redeemed,
        userAddress: users[msg.sender].userAddress,
        adminAddress: 0
      });
      
      // add transction
      transactionsInfo.push(spendTx);
      
      users[msg.sender].userTransactions[users[msg.sender].numTransaction] = spendTx;
      users[msg.sender].numTransaction++;
      
      usersTransactions[totTx] = spendTx;
      totTx++;
    }
    
    //return pendingIndex
    function getPendingIndex() public view returns(uint) {
        // only admin can call
        require(admins[msg.sender].isRegistered, "Admin address not found");
        
        return pendingIndex;
    }
    
    //Get PendingBox by index
    function getPendingRequest(uint _pendingIndex) public view returns(address, uint, uint, uint, uint, bool, uint) {
        // only admin can call
        require(admins[msg.sender].isRegistered, "Admin address not found");
        
        //check index
        require(_pendingIndex<pendingIndex, "Wrong index");
                
        return (pendingBox[_pendingIndex].userAddress, pendingBox[_pendingIndex].tshirt, pendingBox[_pendingIndex].pants, pendingBox[_pendingIndex].jacket, pendingBox[_pendingIndex].other, pendingBox[_pendingIndex].isEvaluated, pendingBox[_pendingIndex].points);
    }
    
    function getNextPendingRequest() public view returns(address, uint, uint, uint, uint, bool, uint) {
        // only admin can call
        require(admins[msg.sender].isRegistered, "Admin address not found");
        
        //check index
        require(evaluatedIndex<pendingIndex, "No More Pending Request");
                
        return (pendingBox[evaluatedIndex].userAddress, pendingBox[evaluatedIndex].tshirt, pendingBox[evaluatedIndex].pants, pendingBox[evaluatedIndex].jacket, pendingBox[evaluatedIndex].other, pendingBox[evaluatedIndex].isEvaluated, pendingBox[evaluatedIndex].points);
    }
    
    //return evaluatedIndex
    function getEvaluatedIndex() public view returns(uint) {
        // only admin can call
        require(admins[msg.sender].isRegistered, "Admin address not found");
        
        return evaluatedIndex;
    }
    
    //Get EvaluatedBox by index
    function getEvaluatedRequest(uint _evaluatedIndex) public view returns(address, uint, uint, uint, uint, bool, uint) {
        // only admin can call
        require(admins[msg.sender].isRegistered, "Admin address not found");
        
        //check index
        require(_evaluatedIndex<evaluatedIndex, "Wrong index");
                
        return (evaluatedBox[_evaluatedIndex].userAddress, evaluatedBox[_evaluatedIndex].tshirt, evaluatedBox[_evaluatedIndex].pants, evaluatedBox[_evaluatedIndex].jacket, evaluatedBox[_evaluatedIndex].other, evaluatedBox[_evaluatedIndex].isEvaluated, evaluatedBox[_evaluatedIndex].points);
    }

    //return user transaction number
    function getUserTransactionNum() public view returns(uint) {
        // only user can call
        require(users[msg.sender].isRegistered, "User address not found");
        
        return users[msg.sender].numTransaction;
    }
    
    function getTransactionInfo(uint _transactionIndex) public view returns(uint, uint, address, address) {
        // only user can call
        require(users[msg.sender].isRegistered, "User address not found");
        
        //require index exists
        require(users[msg.sender].numTransaction > _transactionIndex && _transactionIndex >= 0, "Wrong transaction index");
        
        return (users[msg.sender].userTransactions[_transactionIndex].points, uint(users[msg.sender].userTransactions[_transactionIndex].transactionType), users[msg.sender].userTransactions[_transactionIndex].userAddress, users[msg.sender].userTransactions[_transactionIndex].adminAddress);
    }
    
    //return box requests number
    function getUserBoxNum() public view returns(uint) {
        // only user can call
        require(users[msg.sender].isRegistered, "User address not found");
        
        return users[msg.sender].numBox;
    }
    
    //Get UserBox by index
    function getUserRequest(uint _index) public view returns(address, uint, uint, uint, uint, bool, uint) {
        // only users can call
        require(users[msg.sender].isRegistered, "User address not found");
        
        //check index
        require(_index<users[msg.sender].numBox, "Wrong index");
        
        ClothesBox memory box = users[msg.sender].box[_index];
                
        return (box.userAddress, box.tshirt, box.pants, box.jacket, box.other, box.isEvaluated, box.points);
    }

    //get length of transactionsInfo array
    function transactionsInfoLength() public view returns(uint256) {
        return transactionsInfo.length;
    }
    
    function getAdminTransactionInfo(uint _transactionIndex) public view returns(uint, uint, address, address) {
      // only admin can call
      require(admins[msg.sender].isRegistered, "User not registered as Admin");
        
        //require index exists
        require(totTx > _transactionIndex && _transactionIndex >= 0, "Wrong transaction index");
        
        return (usersTransactions[_transactionIndex].points, uint(usersTransactions[_transactionIndex].transactionType), usersTransactions[_transactionIndex].userAddress, usersTransactions[_transactionIndex].adminAddress);
    }
    
    //return tot transaction number
    function getTotTransactionNum() public view returns(uint) {
      // only admin can call
      require(admins[msg.sender].isRegistered, "User not registered as Admin");
        
        return totTx;
    }
    

    //get length of adminsInfo array
    function adminsInfoLength() public view returns(uint256) {
        return adminsInfo.length;
    }
    
    //handle box
    function sendBox(uint _tshirt, uint _pants, uint _jackets, uint _other) public {
    // only user can call
    require(users[msg.sender].isRegistered, "User address not found");

    /*Clothes[] storage clothes;
    clothes.push(Clothes({clothesType: ClothesType.Tshirt, qta: _tshirt}));
    clothes.push(Clothes({clothesType: ClothesType.Jacket, qta:  _jackets}));
    clothes.push(Clothes({clothesType: ClothesType.Pants, qta:  _pants}));
    clothes.push(Clothes({clothesType: ClothesType.Other, qta:  _other}));

     ClothesBox internal c;
     c.userAddress = msg.sender;
     c.isEvaluated = false;
     c.points = 0;
     c.clothes.push(Clothes({clothesType: ClothesType.Tshirt, qta: _tshirt}));
     c.clothes.push(Clothes({clothesType: ClothesType.Jacket, qta:  _jackets}));
     c.clothes.push(Clothes({clothesType: ClothesType.Pants, qta:  _pants}));
     c.clothes.push(Clothes({clothesType: ClothesType.Other, qta:  _other}));
     */
     
     pendingBox[pendingIndex] = ClothesBox({
         userAddress: msg.sender,
         tshirt: _tshirt,
         pants: _pants,
         jacket: _jackets,
         other: _other,
         isEvaluated: false,
         points: 0
     });
     
     users[msg.sender].box[users[msg.sender].numBox] = pendingBox[pendingIndex];

     users[msg.sender].numBox++;
     pendingIndex++;
    }
    
    //evaluate box
    function evaluateBox(uint _points) public {
    // only admin can call
    require(admins[msg.sender].isRegistered, "Admin address not found");

    //check correct pending request index
    require(evaluatedIndex < pendingIndex, "No more pending request"); 
    
    //check if evaluation is done
    require(!pendingBox[evaluatedIndex].isEvaluated, "Request just evaluated");
    
    //pop pending request
    ClothesBox storage box = pendingBox[evaluatedIndex];
    
    //update box transaction
    box.isEvaluated = true;
    box.points = _points;
        
    //send points to the userAddress
    earnPoints(_points, box.userAddress);
    
    //add evaluated box
    evaluatedBox[evaluatedIndex] = box;
    evaluatedIndex++;
    }
    
    //get balance
    function getBalance() public view returns (uint) {
        return users[msg.sender].points;
    }
    
    function getName() public view returns (string) {
        // only user can call
        require(users[msg.sender].isRegistered, "User address not found");
    
        return string(abi.encodePacked(users[msg.sender].firstName, " ", users[msg.sender].lastName));
    }
    
}

