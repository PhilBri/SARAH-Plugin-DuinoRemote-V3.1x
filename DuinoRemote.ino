const int ledPin = 2;
int ledState;
String myOrder;

void setup() {
  pinMode(ledPin, OUTPUT);
  ledState = digitalRead(ledPin);
  Serial.begin(9600);
  Serial.println(ledState);
}

void loop() {
  if (Serial.available()>0) {
    ledState = digitalRead(ledPin);
    myOrder = Serial.readString();
      if (myOrder=="ON" && ledState==0) {
        digitalWrite(ledPin, HIGH);
      } else if (myOrder=="OFF" && ledState==1){
        digitalWrite(ledPin, LOW);
      }
    Serial.println(digitalRead(ledPin));    
  }
}
