<?php
	$firstName = $_POST['Name'];
	// $lastName = $_POST['lastName'];
	// $gender = $_POST['gender'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	$number = $_POST['message'];

	// Database connection
	$conn = new mysqli('localhost','root','','test');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into contactdetails(Name, email, message) values(?, ?, ?, ?)");
		$stmt->bind_param("sss", $Name, $email, $message);
		$execval = $stmt->execute();
		echo $execval;
		echo "Sent successfully...";
		$stmt->close();
		$conn->close();
	}
?>9