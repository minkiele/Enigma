# Enigma TypeScript

This is an Enigma machine implementation in TypeScript. I built several tests with
Jest to prove it works. It tests some getters, setters, samples from
Wikipedia but nothing fancy.

It contains also an implementation of the Enigma M4, with the fourth rotor and
the thin reflector, but it lacks of constraints and the terminology is not
accurate, as 4th rotor and thin reflector swap pin and plate sides.

Also, although the fourth rotor cannot advance automatically the method accepts
even that rotor.

Yes, it needs some further validation, but the base is that even the M4 is proven to work.

The main references:

 * [Enigma rotor details](https://en.wikipedia.org/wiki/Enigma_rotor_details)
 * [Enigma details](http://users.telenet.be/d.rijmenants/en/enigmatech.htm#steppingmechanism)
 * [Enigma/Sample Messages](http://wiki.franklinheath.co.uk/index.php/Enigma/Sample_Messages)
 * [Umkehrwalze D (Rewirable reflector) implementation](http://www.cryptomuseum.com/crypto/enigma/ukwd/index.htm)

## Library

The library is now built for modern browsers only, I dropped ES5 support just because IE11 is finally dead.
