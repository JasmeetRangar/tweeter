const navToggle = function (){
  $('.new-tweet').slideToggle();
  $('.new-tweet').focus();
}
const tweetSubmit = function (event) {
  event.preventDefault();
  if ($("#tweet-text").val().length > 140) {     
    $('.errorText').text('Cannot submit more than 140 characters');
    $('.tweetError').slideDown();
  } else if ($("#tweet-text").val().length === 0) {
    $('.errorText').text('Cannot submit blank tweet');
    $('.tweetError').slideDown();
  } else {
    let content = $(this).serialize();
    $('#tweet-text').val("");
    $('.tweetError').slideUp();
    $('.counter').text('140');
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
}

$(document).ready(function () {
  $.ajax('/tweets/', {
    method: 'GET'
  }).then((response) => {
    renderTweets(response);
  })
$('.toggleButton').on('click',navToggle);
  $('.tweetForm').on('submit', tweetSubmit);


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