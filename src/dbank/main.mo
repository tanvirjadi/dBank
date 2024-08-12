import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
   stable var currentValue : Float = 0;
   stable var startTime = Time.now();
  
  public func topUp(amount : Float) {
    
    Debug.print("Top up requested: " # debug_show(amount));
    currentValue += amount;
    Debug.print("New balance after top up: " # debug_show(currentValue));
  };
 
  public func withdrawl(amount : Float) {
    Debug.print("Withdraw requested: " # debug_show(amount));
    if (currentValue >= amount ) {
      currentValue -= amount;
      Debug.print("New balance after withdrawal: " # debug_show(currentValue));
    } else {
      Debug.print("Amount greater than available balance");
    }
  };
 
  public query func checkbalance() : async Float {
    Debug.print("Checking balance: " # debug_show(currentValue));
    return currentValue;
  };
 
  public func compound() {
    let presentTime = Time.now();
    let timeElapsedMS  = presentTime - startTime;
    let timeElapsedS  = timeElapsedMS / 1000_000_000 ;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := presentTime;
    Debug.print("New balance after compounding: " # debug_show(currentValue));
  };
};
