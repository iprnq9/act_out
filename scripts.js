<script type="text/javascript">
	$('.countdown').countdown({
		date: +(new Date) + {{ game.time_per_round }},
		render: function (data) {
			$(this.el).text(this.leadingZeros(data.min, 2) + ":" + this.leadingZeros(data.sec, 2));
		},
		onEnd: function () {
			$(this.el).addClass('ended');
			$('.word').text('End of turn!');
			$('.success').addClass('grey');
			$('.fail').addClass('grey');
			$('.next_team').removeClass('hide');
			nextTeam();
		}
	}).on("click", function () {
		$(this).removeClass('ended').data('countdown').update(+(new Date) + 1000).start();
	});
</script>
<script>
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
</script>
<script>
	var current_team = 1;
	var round = 0;
	var text = '{{ game.words }}';
	var arr = text.split(',');
	var word_count = {{ game.word_count }};
	var i = 0;
	var score_1 = -1;
	var score_2 = -1;
	var skips = 0;

	newRound(0);
	log();
	arr = shuffle(arr);
	$('.word').text(arr[0]);

	incrementScore(1);
	incrementScore(-1);

	function updateWordCount(i,word_count) {
		in_bowl = (word_count - i);
		if(in_bowl < 0)
			in_bowl = 0;
		$('.words_left').text("Words left in bowl: " + in_bowl);
	}

	function nextWord() {
		i++;
		if(i == word_count) {
			newRound(round);
		}
		else {
			updateWordCount(i,word_count);
			incrementScore(current_team);
			$('.word').text(arr[i]);
		}
		log();
	}

	$('.success').on("click", function () {
		nextWord();
	});

	$('.fail').on("click", function () {
		if (skips < 1) {
			i++;
			$('.word').text(arr[i]);
			$(this).addClass('grey');
			skips++;
		}
	});

	function nextTeam() {
		current_team = current_team * -1;
		skips = 0;
		$('.fail').removeClass('grey');
		if(current_team == 1) {
			$('.current_team').text('Team 1 is up!');
			$('.team_1').addClass('green-text');
			$('.team_2').removeClass('green-text');
		}
		else {
			$('.current_team').text('Team 2 is up!');
			$('.team_2').addClass('green-text');
			$('.team_1').removeClass('green-text');
		}
		$('.countdown').removeClass('ended').data('countdown').update(+(new Date) + {{ game.time_per_round }}).start();
		$('.next_team').addClass('hide');
	}

	$('.next_team').on("click", function () {
		nextTeam();
		$('.success').removeClass('hide');
		$('.fail').removeClass('hide');
	});

	function incrementScore(team) {
		if(team == 1)
			$('.team_1_score').text(++score_1);
		else
			$('.team_2_score').text(++score_2);
	}

	function updateRound(round) {
		$('.current_round').text(round);
	}

	function newRound(currentRound) {
		if(currentRound == 3){
			endGame();
		}
		else{
			round++;
			arr = shuffle(arr);
			i = 0;
			updateWordCount(i,word_count);
			updateRound(round);
		}
	}

	function endGame() {
		$('.countdown').addClass('hide');
		$('.success').addClass('hide');
		$('.fail').addClass('hide');
		$('.info_card').addClass('hide');
		if(score_1 > score_2){
		   $('.word').text("Team 1 wins!");
		   $('.team_1').addClass('green-text');
		   $('.team_2').addClass('red-text');
		}
		else if(score_2 > score_1){
		   $('.word').text("Team 2 wins!");
		   $('.team_2').addClass('green-text');
		   $('.team_1').addClass('red-text');
		}
		else{
			$('.word').text("It's a tie!");
			$('.team_1').addClass('black-text');
			$('.team_2').addClass('black-text');
		}
	}

	function log() {
		console.log('i:' + i);
		console.log('team: ' + current_team);
		console.log('round: ' + round);
		console.log('words_left: ' + (word_count-i-1));
		console.log('skips: ' + skips);
		console.log('words: ' + arr);
	}
</script>