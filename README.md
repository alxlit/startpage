
# startpage

This is my startpage. It's a Sunday-afternoon project that I threw together
after seeing the [Currently] extension for Chrome (afaik there's nothing
similar for Firefox). This isn't a browser extension, though, it's just a page
I have set up locally.

License: MIT

## Install

I didn't really write this for other people, so if you want to use it you'll
probably end up having to change a few things (e.g. the interface isn't
"responsive" at all, so you may have to adjust for your monitor's resolution).
Here's how to set it up, though, on Ubuntu 12.04:

```sh
~ $ git clone https://github.com/alxlit/startpage startpage
~ $ sudo apt-get install tasksel
~ $ sudo tasksel install lamp-server
~ $ sudo vi /etc/apache2/sites-available/default

<VirtualHost *:80>
  ServerName startpage
  DocumentRoot /home/[user]/startpage
  <Directory /home/[user]/startpage>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride all
    Order allow,deny
    Allow from all
  </Directory>
</VirtualHost>

~ $ sudo vi /etc/hosts

127.0.0.1 startpage

~ $ sudo /etc/init.d/apache2 restart
```

Then change your homepage in Firefox to "startpage," and change
browser.newtab.url in about:config to it also.

## Screenshot

![screenshot](https://raw.github.com/alxlit/startpage/master/screenshots/1.png)

The icons are [Meteocons], and the font is [Raleway], which comes with
[elementary OS].

[Currently]: https://chrome.google.com/webstore/detail/currently/ojhmphdkpgbibohbnpbfiefkgieacjmh?hl=en
[elementary OS]: http://elementaryos.org/
[Meteocons]: http://www.alessioatzeni.com/meteocons/
[Raleway]: http://www.theleagueofmoveabletype.com/raleway

