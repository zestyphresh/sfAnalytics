(function() {

    accounting.settings = {
    	currency: {
    		symbol : "£",
    		decimal : ".",
    		thousand : ",",
    		precision : 0
    	},
    	number: {
    		precision : 0,
    		thousand : ",",
    		decimal : "."
    	}
    };
    
    accounting.settings.currency.format = {
    	pos : '%s%v',
    	neg : '-%s%v',
    	zero : '%s%v'
    };
    
})();
