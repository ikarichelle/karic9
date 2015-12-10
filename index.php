<?php
    $pageID = 'home';
    $title = 'Ajax File Upload';
    
    require('socket.php');
    require('structure.php');
    
    $structure = new Structure;
    
    
    echo $structure->header($title);
    
?>
<div class="main">
        <h1>Load Form Options Via Ajax!</h1>
        <form class="ajax-fun">
            <select id="makes" name="makes"></select><br />
            <div class="error make">Please choose a vehicle make!</div>
            
            <select id="models" name="models" disabled></select><br />
            <div class="error model">Please choose a vehicle model!</div>
            
            <select id="engines" name="engines" disabled></select><br />
            <div class="error engine">Please choose an egnine size!</div>
            
            <input type="text" id="name" name="name" placeholder="Your Name" /><br />
            <div class="error name">Please enter your name!</div>
            
            <input type="tel" id="phone" name="phone"  placeholder="Your Phone" /><br />
            <div class="error phone">Please enter your phone!</div>
            
            <input type="email" id="email" name="email" placeholder="Your Email" /><br />
            <div class="error email">Please enter your email!</div>
            <div class="error not-valid">Please enter a valid email!</div>
            
            <input type="text" id="zipcode" name="zipcode" placeholder="Your Zip Code" /><br />
            <div class="error zipcode">Please enter your zipcode!</div><br />
            
            Best way to contact you:<br />
            <input type="radio" id="best-phone" name="best" value="phone"> Phone<br>
            <input type="radio" id="best-email" name="best" value="email" checked> Email<br>
            <br />
            <input type="submit" value="Submit File" />
        </form>
        <h1 class="greeting"></h1>
        <h2 class="zip-statement"></h2>
        <div class="list"></div>
    </div>
<!--<div class='spinner'>-->
<!--    <h2>Please Stand By While Your Image is Loaded!!</h2>-->
<!--    <img src='spinner.gif' />   -->
<!--</div>-->
<?php
    echo $structure->footer();
?>