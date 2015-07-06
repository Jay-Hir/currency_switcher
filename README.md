# currency_switcher


If you need a dynamic way to switch currencies, it has one of my 5-minute development with dynamic adjustment///

It's will be easy, look ...

At the beginning of the site is required to connect these scripts...

<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script>
<script type="text/javascript" src="js/currencySwitcher.js"></script>


And for all of elements, which are the prices, select a class - "__switcher"

<pre>

<span class="__switcher">212 UAH</span>
<span class="__switcher">15.4 UAH</span>
<span class="__switcher">84,5 UAH</span>
<span class="__switcher">212 UAH</span>

</pre>

And then you need to initialize the script settings...

<pre>

<script type="text/javascript">
        var __switcher = new CurrencySwitcher();
        __switcher.init({
            startCurrency: 'UAH',
            currencyClass: '__switcher',
            typeVariable : 'round_2',
            currencies: [
                {
                    type: 'USD',
                    title: '$',
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
            ],
            debug: true // for debug
        });
</script>

</pre>

I hope you like my version switcher! Have a nice work =)