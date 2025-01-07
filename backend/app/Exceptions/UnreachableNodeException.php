<?php

namespace App\Exceptions;

use Exception;

class UnreachableNodeException extends Exception
{
    public function __construct($node)
    {
        $message = "Node" . $node->name . " is unreachable after " . $node->retries . " retries";
        parent::__construct($message);
    }
}
