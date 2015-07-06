/**
 * Currency Switcher class
 *
 * with: jquery.js, jquery.cookies.js
 *
 * example:
 *
 * var __switcher = new CurrencySwitcher();
 __switcher.init({
            startCurrency: 'UAH',
            currencyClass: '__switcher',
            currencies: [
                {
                    type: 'USD',
                    before: true,
                    cssClass: 'dollar',
                    value: 22.4
                },
                {
                    type: 'EUR',
                    cssClass: 'euro',
                    value: 26.4
                },
                {
                    type: 'UAH',
                    cssClass: 'grivna',
                    value: 1
                }
            ]
        });
 *
 * public method:
 * __switcher.changeCurrency('RUR'); return false

 *
 * @constructor
 */
var CurrencySwitcher = function ()
{
    this.startCurrency = null;
    this.currencyClass = null;
    this.currencies = [];

    this.cookiesName = '__currency';


    this.currentCurrency = null;
    this.currentEquivalent = null;
    this.listCurrencies = [];

    this.typeVariables = ['round', 'cell', 'floor', 'round_2'];
    this.typeVariable = 'round';

    this.debug = false;

    /**
     * Init constructor
     * @param data
     */
    this.init = function (data)
    {
        for(key in data){
            this[key] = data[key];
        }

        /**
         * Get current currency
         */
        this.getCurrentCurrency();
        this.findElements(); // find and replace
    };

    /**
     * Change currency
     * @param type
     */
    this.changeCurrency = function (type)
    {
        this.currentCurrency = type;
        this.setCurrentCurrency(type);

        this.currentEquivalent = null;

        this.findElements(); // find and replace
    };

    /**
     * Get current currency
     * @returns {*}
     */
    this.getCurrentCurrency = function ()
    {
        if(!$.cookie(this.cookiesName)){
            this.setCurrentCurrency(this.startCurrency);
            this.currentCurrency =  this.startCurrency;
        } else {
            this.currentCurrency = $.cookie(this.cookiesName);
        }
    };

    /**
     * Set cookie value
     * @param value
     */
    this.setCurrentCurrency = function (value)
    {
        $.cookie(this.cookiesName, value);
    };

    /**
     * Find current equivalent
     */
    this.findInArrayCurrentCurrency = function()
    {
        for(var i=0; i<this.currencies.length; i++){
            if(typeof this.currencies[i].type != 'undefined' && this.currencies[i].type === this.currentCurrency){
                this.currentEquivalent = this.currencies[i];

                this.listCurrencies.push(this.currencies[i].type);
            }
        }
    };

    /**
     * Get current equivalent
     * @returns {null|*}
     */
    this.getEquivalent = function()
    {
        if(null === this.currentEquivalent){
            this.findInArrayCurrentCurrency();
        }

        return this.currentEquivalent;
    };

    /**
     * Get Math value
     * @param value
     * @returns {*}
     */
    this.getMath = function(value)
    {
        if(this.typeVariable.indexOf('round_') != -1){
            var el = this.typeVariable.split('_');
            return value.toFixed(parseInt(el[1]));
        } else {
            return Math[this.typeVariable](value);
        }
    };

    /**
     * Find and replace al elements
     */
    this.findElements = function()
    {
        var core = this;

        var eq = this.getEquivalent();

        var el = $('.' + this.currencyClass);

        if(el.length == 0 && this.debug === true){
            alert('Undefined currencies');
        }

        el.each(function(){
            var html = '';

            var variable = $(this).text();

            if(!$(this).attr('data-value')){
                $(this).attr('data-value', variable);
            } else {
                variable = $(this).attr('data-value');
            }

            if(typeof eq.before != 'undefined' && eq.before === true)
            {
                if(typeof eq.title != 'undefined'){
                    html += eq.title + ' ';
                } else {
                    html += eq.type + ' ';
                }
            }

            html += core.getMath(parseFloat(variable) / parseFloat(eq.value));

            if(typeof eq.before == 'undefined' || (typeof eq.before != 'undefined' && eq.before === false))
            {
                if(typeof eq.title != 'undefined'){
                    html +=  ' ' + eq.title;
                } else {
                    html += ' ' + eq.type;
                }
            }

            $(this).text(html);
        });

    };




};