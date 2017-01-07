const int ledPin = 3;
int ledState;
String myOrder;

void setup() {
  pinMode(ledPin, OUTPUT);
  //ledState = digitalRead(ledPin);
  Serial.begin(9600);
}

void loop() {
  Serial.println(ledState);
  //while (Serial.available()==0) {
  //}
  if (Serial.available()>0) {
  myOrder = Serial.readString();
  if ( myOrder == "ON" && digitalRead(ledPin)==0) {
    //ledState = "1";
    digitalWrite(ledPin, HIGH);
    Serial.println(1);
  }
  }
}
