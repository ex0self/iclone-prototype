<?php
	session_start();
	require_once 'dbconfig.php';

	if(isset($_POST['email']))
	{
		$email = $_POST['email'];
		
		try
		{	
		
			$stmt = $db_con->prepare("SELECT * FROM user WHERE email=:email");
			$stmt->execute(array(":email"=>$email));
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
