pragma solidity >=0.4.0 <0.7.0; //0.4.24;

contract ProducerContract {

    // model a producer
    struct Producer {
        address adminAddress; // Producer admin address
        string name;          // Producer admin name
        bool isRegistered;
        uint numBox;          // number of box transaction evaluated
        uint pointsProvided;  // amount of points provided by own evaluations 
        mapping(uint => ClothesBox) box;
    }

    // model a admin
    struct Admin {
        address adminAddress;
        string name;
        bool isRegistered;
    }
    
    //model clothing box
    enum ClothesType { Tshirt, Pants, Jacket, Other}
    struct Clothes {
        ClothesType clothesType;
        uint qta;
    }
    
    struct ClothesBox {
        address adminAddress; // reclothes-producer Admin
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
    mapping(address => Producer) public producers;
    mapping(address => Admin) public admins;
    
    //transactions
    uint totPointsProvided; // value of total points provided
    uint debtPoints;        // value of points accumulated from old matherial to send back upcycled
    uint totBoxOld;
    uint totBoxNew;
    
    //Pending Requests
    mapping(uint => ClothesBox) pendingBox;
    uint public pendingIndex;
    
    //Evaluated Requests
    mapping(uint => ClothesBox) evaluatedBox;
    uint public evaluatedIndex;
    
    //upCycled Box Sent
    mapping(uint => ClothesBox) upCycledBox;
    uint public upCycledIndex;
    
    /***********************************************/
    /****************** Modifiers ******************/
    /***********************************************/

    modifier onlyProducer() {
        require(producers[msg.sender].isRegistered);
        _;
    }
    
    modifier onlyAdmin() {
        require(admins[msg.sender].isRegistered);
        _;
    }
    
    modifier producerExists(address _producerAddress) {
        require(producers[_producerAddress].isRegistered, "Account not registered as Producer");
        _;
    }
    
    modifier adminExists(address _adminAddress) {
        require(admins[_adminAddress].isRegistered, "Account not registered as Reclothes Admin");
        _;
    }
    
    /***********************************************/
    /**************** Registration *****************/
    /***********************************************/
    
    //register sender as producer admins
    function registerProducer (string _name) public {
      //check msg.sender in existing producers
      require(!producers[msg.sender].isRegistered, "Account already registered as Producer");
 
      //check msg.sender in existing admins
      require(!admins[msg.sender].isRegistered, "Account already registered as Reclothes Admin");

      //add user account
      producers[msg.sender] = Producer(msg.sender, _name, true, 0, 0); 
    }

    //register sender as admin
    function registerAdmin (string _name) public {
      //check msg.sender in existing users
      require(!producers[msg.sender].isRegistered, "Account already registered as Producer");

      //check msg.sender in existing admins
      require(!admins[msg.sender].isRegistered, "Account already registered as Admin");

      //add admin account
      admins[msg.sender] = Admin(msg.sender, _name, true);


    }
    
    
    /***********************************************/
    /***************** Users Data ******************/
    /***********************************************/
    
    //get Producer Data
    function getProducerData (address _producerAddress) producerExists(_producerAddress) public view returns(address producerAddress, string name, uint numBox, uint points) {
      return (producers[_producerAddress].adminAddress, producers[_producerAddress].name, producers[_producerAddress].numBox, producers[_producerAddress].pointsProvided);
    }
    
    
    /****************************************************/
    /*** All Box Requests -> Old, Evaluated, UpCycled ***/
    /****************************************************/
    
    /********* Pending Request -> Box with Old Clothes *********/
    function getPendingIndex() public view returns(uint) {
        return pendingIndex;
    }
    
    function getPendingRequest(uint _pendingIndex) public view returns(address, uint, uint, uint, uint, bool, uint) {
        //check index
        require(_pendingIndex<pendingIndex && _pendingIndex>=0, "Wrong index");
                
        return (pendingBox[_pendingIndex].adminAddress, pendingBox[_pendingIndex].tshirt, pendingBox[_pendingIndex].pants, pendingBox[_pendingIndex].jacket, pendingBox[_pendingIndex].other, pendingBox[_pendingIndex].isEvaluated, pendingBox[_pendingIndex].points);
    }
    
    function getNextPendingRequest() public view returns(address, uint, uint, uint, uint, bool, uint) {
        //check index
        require(evaluatedIndex<pendingIndex, "No More Pending Request");
                
        return (pendingBox[evaluatedIndex].adminAddress, pendingBox[evaluatedIndex].tshirt, pendingBox[evaluatedIndex].pants, pendingBox[evaluatedIndex].jacket, pendingBox[evaluatedIndex].other, pendingBox[evaluatedIndex].isEvaluated, pendingBox[evaluatedIndex].points);
    }
 
    
    /********* Evaluated Request -> Box with Old Clothes evaluated *********/
    function getEvaluatedIndex() public view returns(uint) {
        return evaluatedIndex;
    }
    
    function getEvaluatedRequest(uint _evaluatedIndex) public view returns(address, uint, uint, uint, uint, bool, uint) {
        //check index
        require(_evaluatedIndex<evaluatedIndex && upCycledIndex>=0, "Wrong index");
                
        return (evaluatedBox[_evaluatedIndex].adminAddress, evaluatedBox[_evaluatedIndex].tshirt, evaluatedBox[_evaluatedIndex].pants, evaluatedBox[_evaluatedIndex].jacket, evaluatedBox[_evaluatedIndex].other, evaluatedBox[_evaluatedIndex].isEvaluated, evaluatedBox[_evaluatedIndex].points);
    }


    /********* UpCycled Request -> Box with New Clothes *********/
    function getUpCycledIndex() public view returns(uint) {
        return upCycledIndex;
    }
    
    function getUpCycledRequest(uint _upCycledIndex) public view returns(address, uint, uint, uint, uint, bool, uint) {
        //check index
        require(_upCycledIndex<upCycledIndex && upCycledIndex>=0, "Wrong index");
                
        return (upCycledBox[_upCycledIndex].adminAddress, upCycledBox[_upCycledIndex].tshirt, upCycledBox[_upCycledIndex].pants, upCycledBox[_upCycledIndex].jacket, upCycledBox[_upCycledIndex].other, upCycledBox[_upCycledIndex].isEvaluated, upCycledBox[_upCycledIndex].points);
    }
    
    
    /****************************************************/
    /***************** Data of Requests *****************/
    /****************************************************/
    
    function getTotPointsProvided() public view returns(uint) {
        return totPointsProvided;
    }
    
    function getTotBoxOld() public view returns(uint) {
        return totBoxOld;
    }
    
    function getTotBoxNew() public view returns(uint) {
        return totBoxNew;
    }
    
    
    /****************************************************/
    /************** Clothes Box Operations **************/
    /****************************************************/
    
    function sendBoxOld(uint _tshirt, uint _pants, uint _jackets, uint _other) onlyAdmin() public {
         pendingBox[pendingIndex] = ClothesBox({
             adminAddress: msg.sender,
             tshirt: _tshirt,
             pants: _pants,
             jacket: _jackets,
             other: _other,
             isEvaluated: false,
             points: 0
         });
    
         totBoxOld++;
         pendingIndex++;
    }
    
    function sendBoxNew(uint _tshirt, uint _pants, uint _jackets, uint _other, uint _points) onlyProducer() public {
        require(debtPoints >= _points, "Not enought points accumulated in old material boxes");
            
        ClothesBox memory box = ClothesBox({
         adminAddress: msg.sender,
         tshirt: _tshirt,
         pants: _pants,
         jacket: _jackets,
         other: _other,
         isEvaluated: true,
         points: _points
        });
        
        producers[msg.sender].box[producers[msg.sender].numBox] = box;
        producers[msg.sender].numBox++;
        producers[msg.sender].pointsProvided += _points;
        
        //add upcycled box
        upCycledBox[upCycledIndex] = box;
        upCycledIndex++;
        
        debtPoints -= _points;
        totBoxNew++;
    }

    // Evaluate Old Box
    function evaluateBox(uint _points) onlyProducer() public {
        //check correct pending request index
        require(evaluatedIndex < pendingIndex, "No more pending request"); 
        
        //check if evaluation is done
        require(!pendingBox[evaluatedIndex].isEvaluated, "Request just evaluated");
        
        //pop pending request
        ClothesBox storage box = pendingBox[evaluatedIndex];
        
        //update box transaction
        box.isEvaluated = true;
        box.points = _points;
            
        //add evaluated box
        evaluatedBox[evaluatedIndex] = box;
        evaluatedIndex++;
        
        debtPoints += _points;
        totPointsProvided += _points;
    }
    
}

