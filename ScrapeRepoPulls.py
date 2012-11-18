# ScrapeRepoPulls.py
# Downloads a repo's closed pull requests
# Saves as JSON for Pull Command game

import urllib, json, time

# define each repo you are scraping in this run
# user_name/repo_name as set in the URL
repos = [
  "OpenCMISS/cm",
  "twitter/bootstrap",
  "rails/rails",
  "nathanmarz/storm",
]

output_pulls = [ ]
index = 0

for repo in repos:
	pagenum = 1
	repopulls = "this is a long enough string to make the first page count"
	while(len(repopulls) >= 30):
		print "Loading page " + str(pagenum) + " from " + repo
		repopulls = json.loads( urllib.urlopen("https://api.github.com/repos/" + repo + "/pulls?state=closed&page=" + str(pagenum)).read() )
		output_pulls.append([ ])

		for pullreq in repopulls:
			try:
				if(pullreq["closed_at"] != None):
					usericon = ""
					if(pullreq["user"] == None or pullreq["user"]["avatar_url"] == None):
						usericon = "https://secure.gravatar.com/avatar/e86c5d5b142a13248cbbce010fea141a?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
					else:
						usericon = pullreq["user"]["avatar_url"]

					if(pullreq["merged_at"] != None):
						output_pulls[index].append({
							"id": pullreq["url"],
							"title": (pullreq["title"] or ""),
							"body": (pullreq["body"] or "").replace("\r\n","<br/>"),
							"user": {
								"avatar_url": usericon
							},
							"outcome": "merge"
						})
					else:
						output_pulls[index].append({
							"id": pullreq["url"],
							"title": (pullreq["title"] or ""),
							"body": (pullreq["body"] or "").replace("\r\n","<br/>"),
							"user": {
								"avatar_url": usericon
							},
							"outcome": "reject"
						})
			
			except:
				print repopulls
				repopulls = "stop scraping"
			
		# attempt next page in a minute
		# 60 API requests / hour without OAuth
		pagenum = pagenum + 1
		time.sleep(60)
		

	# save this JSON file
	print "Saving " + repo
	missiles = open(repo.replace('/','-') + ".json", 'w')
	missiles.write( str( output_pulls[index] ) )
	missiles.close()

	# go to next repo
	index = index + 1