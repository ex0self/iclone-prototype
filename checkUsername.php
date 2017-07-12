<?php
	session_start();
	require_once 'dbconfig.php';

	if(isset($_GET['username']))
	{
		$username = $_GET['username'];
		
		try
		{	
		
			$stmt = $db_con->prepare("SELECT * FROM user WHERE username=:username");
			$stmt->execute(array(":username"=>$username));
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$count = $stmt->rowCount();
			if($count>0){
				echo "1";
			}else{
				echo "0";
			}
				
		}
		catch(PDOException $e){
			echo $e->getMessage();
		}
	}

?>
