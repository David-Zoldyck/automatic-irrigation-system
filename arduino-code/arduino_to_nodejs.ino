const int dry = 1023;
const int wet = 400;
int value = 0;
int percentage = 0;

void setup(){
  pinMode(3, OUTPUT);
  Serial.begin(9600);
}

void loop(){
  value = analogRead(A0);
  percentage = map(value, dry, wet, 0, 100);
  if (percentage >= 100){
    Serial.println("100%");
  }
  else if (percentage <= 0){
    Serial.println("0%");
  }
  else {
    Serial.print(percentage);
    Serial.println("%");
  }

  if (percentage <= 20) {
    digitalWrite(3, LOW); // Relay ON (Assuming LOW activates the relay)
  } else if (percentage > 45) {

    digitalWrite(3, HIGH); // Relay OFF
  }

  delay(5000);
}