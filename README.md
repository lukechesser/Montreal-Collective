# Montreal Collective

[ ![Codeship Status for lukechesser/Montreal-Collective](https://codeship.io/projects/ba695d90-99b3-0131-0bc4-32f23639df46/status?branch=master)](https://codeship.io/projects/17363)

**A collection of Montreal's best tech companies, startups, investors, and events.**

Everything for the site is available to be modified here. To submit a company/event/startup/investor, [fork the repo and submit a pull-request](#how-to-add-a-company) with the changes. Same deal for making any changes to existing entries.

Most other 'Made by X' sites suffer from a lack of maintenance, because their creators register the domain name, throw up a quick site, quickly lose interest/become overwhelmed by the constant churn of startups, causing the site to become outdated and unmaintained. Since everything for this site is hosted on GitHub in flat files, and the site is hosted on AWS, this should make the project easy to maintain and update. So instead of a flood of emails for me and a shitty outdated website for you, we'll be modern and try this out.

If you want to contribute — even for an entry that isn't yours per-se — [feel free](#can-i-help-you-maintain-the-project). GitHub can be a lonely place sometimes, so contributors/maintainers are always welcome, regardless of your skill level or age.

## How to add a company

To add your entry, follow [the steps for forking the repo and creating a pull-request][fork repo] and update the `_data/entries.yml` file with your entry's information. The mandatory information to include is:

```
- name: Entry Name
  category: startup | company | investor | event
  url: www.name.com
  description: Some nice description about the entry. Preferrably between 125-175 characters. Like a long tweet.
```

Optionally, you can add:

```
- ...
  ...
  twitter: entryname
  facebook: entryname
```

Save your entry at the bottom of the file (use spaces for the indentation, not tabs — YAML doesn't like tabs). Note a couple of guidelines (also see the existing entries for a better idea of what to write):

1. **name**: Don't name it 'Montreal blah blah'. That's assumed already. So if it's the 'Montreal' chapter of 'Startup Festival', call it Startup Festival.

2. **category**: Use singular categories (event instead of events). Only list each entry as one, otherwise you might break something.

3. **url**: Don't put in the `https://` or `http://`. Preferably, don't put in the `/en` or `/fr` either (if it's a bilingual site) — just link to the root domain since it will likely be the more popular version. Leave off the trailing `/` if your website supports it (it looks prettier without the slash <3).

4. **description**: Ease off the *marketing lingo* and definitely leave off the *investor speak* (ie there better not be any appearences of 'digital solution' or 'synergy' anywhere in your description). Use the [third-person narrative](http://en.wikipedia.org/wiki/Third_person) preferrably (ie. don't say 'Shopify is the best platform for YOU to build an online store').

5. **twitter** (optional): leave off the `@`. Preferrably all lowercase.

6. **facebook** (optional): preferrably all lowercase.

As for the image/logo, fire up Photoshop and [download this template PSD](http://cl.ly/T8j5). If you turn on the guidelines, make sure your logo fits inside the inner guidelines and is roughly centered. Preferrably, use a background color other than white (it makes your company standout more and looks less boring). Save the image as a JPEG (high-quality is fine, because it gets run through a minimizer before deploying anyways). **Put the logo in the `_img` directory, not the `img` directory**.

**Commit and push. Then open up a pull-request.** If the pull-reqest is approved, it will be merged and automatically pushed to the site via a build process on [Codeship](https://codeship.io/).

Lastly, it would be great if you linked to the site somewhere on your own website (ex. a link in your site's footer linking 'Made in Montreal' to this site).

If this all sounds too technical, feel free to [create an issue][create an issue] with the same information (logo, name, description, etc.) and one of the maintainers will add it in when they get time.

## Editing existing entries

Same deal as adding a new entry: [fork and create a pull-request][fork repo]. Only this time half the work is already done for you. Note that changes can be made by anyone, but preference will be given for employees/volunteers of the company/startup/event/investor.

## Contributing

To setup the environment locally, clone the repo and from the command line:

1. Install [jekyll](https://github.com/jekyll/jekyll) globally with `gem install jekyll`.

If you're only editing the `_data/entries.yml` file, the only command you need is `jekyll serve`, which will build the static site and serve the file at [http://0.0.0.0:3000](http://0.0.0.0:3000).

If you want to do more than just edit the `_data/entries.yml` file, you'll also have to install [Grunt](https://github.com/gruntjs/grunt) and its dependencies:

2. Install [grunt-cli](https://github.com/gruntjs/grunt-cli) globally with `npm install -g grunt-cli`.
3. Navigate to the root `/montreal-collective` directory, then run `npm install`. npm will look at [package.json](package.json) and automatically install the necessary local dependencies listed there.

When completed, you'll be able to run the various Grunt commands provided from the command line (look in the GruntFile.js for the additional commands).

**Unfamiliar with `npm`? Don't have node installed?** That's okay. npm stands for [node packaged modules](http://npmjs.org/) and is a way to manage development dependencies through node.js. [Download and install node.js](http://nodejs.org/download/) before proceeding.

## FAQs

#### What's the difference between a startup and a company?
Not sure. For the purposes of this, just pick one. If the business is in the +150 employee range, then it's probably a company.

#### Can we add more categories?
If you think there's a good category that isn't up there (like maybe 'Resources' or 'Agencies'), let me know. [Create an issue][create an issue] or [message me on twitter][luke twitter] and we can talk about it.

#### Can I help you maintain the project?
Yep! [Message me on twitter][luke twitter] and I'll be happy to give you some access to the repo to help out.

## Contributors

- Luke Chesser ([Twitter](https://twitter.com/lukechesser), [Blog](http://imluke.me/), [Dribbble](http://dribbble.com/lukechesser), [GitHub](https://github.com/lukechesser))
- Sam Vermette ([Twitter](https://twitter.com/samvermette), [GitHub](https://github.com/samvermette))
- Mauricio Idarraga ([GitHub](https://github.com/midarraga))
- Will Steves ([Github](https://github.com/swill))
- 1devca ([Github](https://github.com/1devca))
- Frederic Thouin ([GitHub](https://github.com/fredbusbud))

## License

Copyright (c) 2013 Luke Chesser

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[fork repo]: https://help.github.com/articles/fork-a-repo
[create an issue]: https://github.com/lukechesser/Montreal-Collective/issues/new
[luke twitter]: https://twitter.com/lukechesser
