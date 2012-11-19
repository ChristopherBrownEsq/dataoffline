<?
// Establish a connection to your database.
// Not a secure way of connecting to mysql, but this is a demo.
$username="USERNAME";
$password="PASSWORD";
$database="DATABASE-NAME";

$link = mysql_connect('127.0.0.1:33066', $username, $password);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

@mysql_select_db($database) or die( "Unable to select database");

// The AJAX POST values will go into php varilbles. PHP will handle it from here. 
$first=$_POST['first'];
$last=$_POST['last'];
$mobile=$_POST['mobile'];

// INSERT into your contact table. Create one if you don't have one.
$query = "INSERT INTO contacts (ID, first, last, mobile) VALUES ('', '$first', '$last', '$mobile')";
if (!mysql_query($query,$link))
  {
  die('Error: ' . mysql_error());
  }

// In the Javascript file hr.responseText is set for a respond back...
echo  "Connected successfully <h5> 1 record added </h5>";
echo rand();

mysql_close($link);

?>