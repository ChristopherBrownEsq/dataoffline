<?

$username="drupaluser";
$password="";
$database="test";

$link = mysql_connect('127.0.0.1:33066', $username, $password);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}


@mysql_select_db($database) or die( "Unable to select database");

$first=$_POST['first'];
$last=$_POST['last'];
$mobile=$_POST['mobile'];


$query = "INSERT INTO contacts2 (ID, first, last, mobile) VALUES ('', '$first', '$last', '$mobile')";
if (!mysql_query($query,$link))
  {
  die('Error: ' . mysql_error());
  }
  
echo  "Connected successfully <h5> 1 record added </h5>";
echo rand();

mysql_close($link);


?>