

$(document).ready(function () {
  $.ajax('/tweets/', {
    method: 'GET'
  }).then((response) => {
    renderTweets(response);
  })

  $('.tweetForm').on('submit', function (event) {
    event.preventDefault();
    if ($("#tweet-text").val().length > 140) {
      $('.tweetError').css('display','block');
      $('.errorText').text('Cannot submit more than 140 characters');
    } else if ($("#tweet-text").val().length === 0) {
      $('.tweetError').css('display','block');
      $('.errorText').text('Cannot submit blank tweet');
    } else {
      let content = $(this).serialize();
      $('.tweetError').css('display','none');
      $('#tweet-text').val("");
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: content
      }).done(() => {
        $.ajax('/tweets/', {
          method: 'GET'
        }).then((response) => {
          renderTweets(response.slice(response.length - 1))
        })
      });
    }
  })


  const renderTweets = function (tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $(".tweetContainer").append($tweet);
    }
  }



  const createTweetElement = function (tweet) {
    const name = tweet.user.name;
    const handle = tweet.user.handle;
    const avatarUrl = tweet.user.avatars;
    const content = tweet.content.text;
    const timeStamp = new Date(tweet.created_at).getTime();
    const today = new Date().getTime();
    const time = Math.floor((today - timeStamp) / 1000 / 60 / 60 / 24);
    let singleTweet = `
  <article>
  <header>
            <div class="headerLeft">
            <img class="tweetAvatar" src="${avatarUrl}">
            <div>${name}</div>
            </div>
            <div class="handle">${handle}</div>
            </header>
            <div class="single-tweet__rowTwo">
            <span class="tweet">${content}</span>
            <footer>
            <div> ${time} days ago </div>
            <div>🏴 📟 ❤</div>
            </footer>
            </article>
            `;

    return singleTweet;
  }

})