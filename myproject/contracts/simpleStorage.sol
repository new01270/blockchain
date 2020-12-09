pragma solidity >=0.4.22 <0.8.0;

contract SimpleStorage{
    uint public storeData;
    
    function set(uint x) public {
        storeData =x;
    }
    function get() public view returns(uint){
        return storeData;
    } 
}