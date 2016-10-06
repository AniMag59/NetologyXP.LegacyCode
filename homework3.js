player.showHighScoreList = function(pageToken, utilitiesTest, gapiTest, isTesting) {
    //utilities, gapi внешние зависимости
    if (isTesting){
        var utilities = utilitiesTest;
        var gapi = gapiTest;
        function execute(){

        }
        function createPlayerList() {

        }
        function createButton() {

        }
    }//шов
    document.querySelector('#highScoreListDiv').innerHTML = '';
    document.querySelector('#highScoreListDiv').style.display = 'block';
    // Create the request.
    LEADERBOARD_ID = document.getElementById('leaderboardIdShowHS').value;
    var request = gapi.client.games.scores.list(
        {leaderboardId: LEADERBOARD_ID,
            collection: 'PUBLIC',
            timeSpan: 'all_time',
            pageToken: pageToken,
            maxResults: '10'});
    request.execute(
        function(response) {
            console.log('High score', response);
            if (response.error) {
                alert('Error ' + response.error.code + ': ' + response.message);
                return;
            }
            var root = document.getElementById('highScoreListDiv');
            player.createPlayerList(root, response.items, true);
            if (response.prevPageToken) {
                root.appendChild(
                    utilities.createButton('Prev', response.prevPageToken,
                        function(event) {
                            player.showHighScoreList(event.target.value, utilitiesTest, gapiTest, isTesting);
                        }));
            }
            if (response.nextPageToken) {
                root.appendChild(
                    utilities.createButton('Prev', response.prevPageToken,
                        function(event) {
                            player.showHighScoreList(event.target.value, utilitiesTest, gapiTest, isTesting);
                        }));
            }
        });
};