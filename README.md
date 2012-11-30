# Pull Command

### A game based on Github

<img src="http://i.imgur.com/SeUkG.png"/>

## Gameplay

<p>You run a Github repo (an online code library).</p>
<p>You face several incoming pull requests (code changes) which either affect the game as you play it (Meta mode) or represent real Github code changes (Bootstrap, Rails, and a FORTRAN project).</p>
<p>You gain points for shooting down rejected pull requests and letting successful (merged) ones pass through.</p>
<p>You lose points for doing it the other way around.</p>
<p>Use the pull request message to determine friend from foe. Hover the mouse over an incoming missile to see a description.</p>

### Start in Meta Mode

<p>Even if you don't know about Github or coding, you can play in Meta mode.</p>

#### Sample "bad" pull requests
<ul>
	<li>Double speed of incoming missiles</li>
	<li>Change font to Comic Sans</li>
</ul>

#### Sample "good" pull requests
<ul>
	<li>Add second defense launcher</li>
	<li>Slow down incoming missiles</li>
</ul>

## Customization
Pull Command runs on Github Pages. You can add new repos with the included ScrapeRepoPulls.py

1) Set the repo list

    repos = [
      "twitter/bootstrap",
      "rails/rails"
    ]

2) Run python ScrapeRepoPulls.py. It may take several minutes to a few hours to download pull request information.

3) Add options to index.html

    <li id="gameMode4">
      <a href="#" onclick="gameMode(5, 'USERNAME-REPONAME');">REPONAME</a>
    </li>

## Inspiration

<p>Based on Andy Mason's MIT-licensed <a href="https://github.com/andymason/Missile-Command-JavaScript-Clone" target="_blank">Missile Command JavaScript Clone</a>.</p>
<p>Includes Bootstrap and jQuery</p>

## License

Open source, MIT license