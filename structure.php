<?php
    class Structure
    {
        public function header($title)
        {
            $result =
            "<!DOCTYPE html>
            <html>
            <head>
            <meta charset='UTF-8'>
            <title>.$title</title>
            </head>
            <body>
            <link rel='stylesheet' type='text/css' href='advanced.css'>";
            return $result;
        }
        
         function footer()
        {
            $result =
                    '</body>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
                    <script src="scripts.js"></script>
                </html>';
            return $result;
        }
    
    }

?>