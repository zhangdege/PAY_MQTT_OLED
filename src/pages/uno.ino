#include <WiFi.h>
#include <PubSubClient.h>
#include "SSD1306.h"
#include <ArduinoJson.h>
#include <Wire.h>
#include <qrcode.h>
#define SDA 26
#define SCL 25

char ssid[] = "apsu";           // Enter your WiFi name
char password[] = "yangpaopao"; // Enter WiFi password
// MQTT Broker
const char *mqtt_broker = "192.168.50.195";
const char *topic = "/pay/subscriptor";
const char *pub_topic = "/pay/on_ready";
const char *mqtt_username = "";
const char *mqtt_password = "";
const char *startstr = "QRcoder";
const int mqtt_port = 1883;
String comment = "";

SSD1306 display(0x3c, SDA, SCL);
QRcode qrcode(&display);
WiFiClient espClient;
PubSubClient client(espClient);

// declare function
void callback(char *topic, byte *payload, unsigned int length)
{
  String message = "";
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  for (int i = 0; i < length; i++)
  {
    message += (char)payload[i];
  }
  delay(500);
  if (message)
  {
    display.clear();
    display.drawString(0, 0, message);
    display.drawString(0, 0, message);
    display.display();
    delay(10000);
    qrcode.create("http://aa.kknd0.cn/pay?userId=00001&total=0.01");
  }
  Serial.println(message);
  Serial.println();
  Serial.println("-----------------------");
}

// loop
void setup()
{
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi..");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.println(".");
  }
  Serial.print("Connected to the WiFi network,Ip address is ");
  Serial.println(WiFi.localIP());
  delay(500);
  //connecting to a mqtt broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected())
  {
    String client_id = "esp32";
    client_id += String(WiFi.macAddress());
    Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
    if (client.connect(client_id.c_str(), mqtt_username, mqtt_password))
    {
      Serial.println("Public emqx mqtt broker connected");
    }
    else
    {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }
  if (Serial.available())
  {
    comment = Serial.readStringUntil('\n');
    comment.trim();
  }
  // publish and subscribe
  client.publish(pub_topic, comment.c_str());
  client.subscribe(topic);
  delay(500);
  display.init();
  display.drawString(0, 0, "正在启动!");
  display.display();
  delay(15000);
  qrcode.init();
  qrcode.create("http://aa.kknd0.cn/pay?userId=00001&total=0.01");
}

void loop()
{
  client.loop();
}