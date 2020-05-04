# Installation Guide

> For Linux installation follow [this guide](https://hackernoon.com/hyperledger-fabric-installation-guide-74065855eca9) changing the prerequisite version with the below one

# Prerequisite

1. [cUrl](#curl) - latest version
2. [Docker & Compose](#docker) (version 17.06.2-ce or greater - I used v18.09.9 | Compose version 1.14.0 or greate)
    - [Installation](#docker_installation)
    - [Test](#docker_test)
3. [Goland](https://golang.org/dl/) (version 1.12 or greater - I used v1.14.2)
4. [Nodejs](https://nodejs.org/en/) (version 8.9.x or greater - I used v10.5.2)
5. [npm](https://www.npmjs.com/) (version 5.6.0 or greater - I used 6.13.7) 
6. Python 2.7
7. wget - 1.19.1 or greater 

> I am using Windows 10 Pro and the Fabric v1.4

<a name="curl"></a>
# 1. cUrl

Please check if cURL is already installed in your PC.

```
curl --help
```

If you don’t get any error it means cURL is installed in your PC and you can go
to the next step. For others please follow the below steps.
1. To install cURL, download the package according to your Windows 32/64 bit
from this [link](https://curl.haxx.se/download.html). Extract the package and run the curl.exe present in the bin
folder.
2. Add the curl in the environment variable.
3. Open the cmd and check the curl -help.
If you don’t get any error it means you curl is installed successfully.
Follow this [link](https://stackoverflow.com/questions/9507353/how-do-i-install-and-use-curl-on-windows) for troubleshooting.

<a name="docker"></a>
# 2. Docker & Compose

<a name="docker_installation"></a>
## Installation

Before installing the docker, check if virtualization is Enabled in your PC or not. To
check it, open `Task Manager » Performance Tab » CPU`


<p align="center">
  <img src="doc/img/installation/virtualization.png" width="500" title="virtualization">
 </p>
<p align="center"><b>Figure 1</b>: virtualization</p>  


From the BIOS settings, virtualization can be turned to Enabled. Instructions to
enter BIOS settings vary from the pc manufacturer to manufacturer. Please check
this [link](https://www.wikihow.tech/Enable-Hardware-Virtualization) for the instructions.

Once the virtualization is Enabled we can move to download the docker. Please
be sure which Windows you’re using before installing Docker. There are 2 versions
of Docker for Windows.
1. Docker Toolbox — Windows 8, Windows 10 Home
2. Docker Desktop — Windows 10 Pro, Enterprise — 64 bit
You first need to have an account in DockerHub to download the docker desktop.
Please signup if you don’t have one.

Download the docker from this [link](https://hub.docker.com/editions/community/docker-ce-desktop-windows).

> Note: While installing keep the settings default don’t change anything

<a name="docker_test"></a>
## Test Docker Installation

1. Open the cmd window
2. Run docker -version and docker-compose -version

```
docker --version
Docker version 18.09.2, build 6247962

docker-compose --version
docker-compose version 1.23.2, build 1110ad01
```

Pull the [hello-world image](https://hub.docker.com/_/hello-world) from Docker Hub and run a container with the fol-
lowing command:

```
docker run hello-world
```

<p align="center">
  <img src="doc/img/installation/docker_hello.png" width="500" title="docker_hello">
 </p>
<p align="center"><b>Figure 2</b>: docker hello-world</p> 

If you get this message then the Docker installed successfully in your machine.
For more information on Docker check the [official documentation](https://docs.docker.com/docker-for-windows/).

# 3. Goland 

Download the Golang package from the [official site](https://golang.org/dl/).
Once it is installed open the command prompt and run
```
go version
```
Output

```
go version go1.11.5 windows/amd64
```

# 4. Nodejs and npm

Download the node v8.x or greater from this [link](https://nodejs.org/en/download/) and install it.
Check if it is installed correctly.

```
node -v
v8.16.0

npm -v
6.4.1
```





