<?php
/**
* A singleton PDO wrapper and utility functions.
**/
class Database {
    protected $host = '127.0.0.1';
    protected $db   = 'quiz';
    protected $user = 'root';
    protected $pass = '';
    protected $charset = 'utf8';

    protected $dsn;
    protected $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    protected $pdo;
    protected static $instance;
    protected function __construct(){
        $this->dsn  = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
        $this->pdo = new PDO($this->dsn, $this->user, $this->pass, $this->opt);

    }

    public static function getInstance(){
        if(!(self::$instance instanceof self)){
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function query($sql) {
        $call = $this->pdo->prepare($sql);
        $call->execute();
        return $call->fetchAll();
    }

    public function getPdo(){
        return $this->pdo;
    }

}
