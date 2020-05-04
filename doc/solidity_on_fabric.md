# Solidity Smart Contract on Hyperledger Fabric

# Table of Contents

1. [Prerequisites Intructions](#prerequisite)
2. [Setting up](#set_up)
    - [Mount the EVM Chaincode](#mount)
    - [Build and Start the EVM](#build_evm)
3. Test evm chaincode

---

<a name="prerequisite"></a>
## 1. Prerequisites Intructions

To test the solidity smart contract we start by "first-network". [documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html).

1. fabric-samples installation - follow the previous [guide](/fabric_installation_guide.md)
2. clone this [git repository](https://github.com/hyperledger/fabric-chaincode-evm), which is a chaincode EVM (Ethereum Virtual Machine) based on the Hyperledger Burrow.
3. open [Remix](https://remix.ethereum.org/), our Solidity testing environment

<a name="set_up"></a>
## 2. Setting Up

<a name="mount"></a>
### Mount the EVM Chaincode

First of all, navigate to the `first-network` folder inside `fabric-samples` and make
a slight modification in the `docker-compose-cli.yaml`. We will map the location
of `fabric-chaincode-evm` folder that we have cloned from the git repository to our
`cli` container. So add the following line to the `services >> cli >> volumes`

```
services:
        ...
        cli:
            ....
            volumes:
                - ....
                - <location fabric-chaincode-evm>:/opt/gopath/src/github.com/hyperledger/fabric-chaincode-evm
```

Now always in git bash start the network with:

```
./byfn.sh up
```

<a name="build_evm"></a>
## Build and Start the EVM

Once everything is ready, open `cmd` and go into the `cli` container with the command:


```bash
docker exec -it cli bash
```

> Note: git bash not support -it

install the EVM chaincode on all the peers


```bash
peer chaincode install -n evmcc -l golang -v 0 -p github.com/hyperledger/fabric-chaincode-evm/evmcc
```





