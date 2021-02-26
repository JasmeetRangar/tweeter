
$(document).ready(function () {
  $.ajax('/tweets/', {
    method: 'GET'
  }).then((response) => {
    renderTweets(response);
  })
  $('.toggleButton').on('click', navToggle);
  $('.tweetForm').on('submit', tweetSubmit);
  $(document).scroll(() => $('.goToTopButton').css('display', 'block'));
  $(document).scrollTop(() => $('.goToTopButton').css('display', 'none'));
  //scroll to top button response and css to hide and show
  $('.goToTopButton').on('click', topFunction);
  window.onscroll = function () { scrollFunction() };  
  function scrollFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      $('.goToTopButton').css('display', 'block');
    } else {
      $('.goToTopButton').css('display', 'none');
    }
  }
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
})

/**Takes an array of tweets and renders them to the client page
 * 
 * @param {array of tweets} tweets 
 */
const renderTweets = function (tweets) {
  $('.tweetContainer').html("");
  // loops through tweets
  const sortedTweets = tweets.sort((a, b) => b.created_at - a.created_at);

  for (let tweet of sortedTweets) {
    // calls createTweetElement for each tweet
    let $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $(".tweetContainer").append($tweet);
  }
}
/**Takes a single tweet and returns the html container of the input tweet
 * 
 * @param {One single tweet object} tweet 
 */
const createTweetElement = function (tweet) {
  const name = tweet.user.name;
  const handle = tweet.user.handle;
  const avatarUrl = tweet.user.avatars;
  const content = tweet.content.text;
  const timeStamp = new Date(tweet.created_at).getTime();
  const today = new Date().getTime();
  const time = Math.floor((today - timeStamp) / 1000 / 60 / 60 / 24);
  let singleTweet = `
          <article class="singleTweet">
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
          <div class="icons">🏴 📟 ❤</div>
          </footer>
          </article>
          `;

  return singleTweet;
}
/**Makes the Write new tweet button toggle text box
 * 
 */
const navToggle = function () {
  $('.new-tweet').slideToggle();
  $('#tweet-text').focus();
}
/**Sumbits tweets from text box and appends it to container dynamically
 * 
 * @param {*} event 
 */
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
      //clear all tweets

      $.ajax('/tweets/', {
        method: 'GET'
      }).then((response) => {
        renderTweets(response);
      })
    });
  }
}
