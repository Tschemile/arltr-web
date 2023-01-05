import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Header = () => {
  return <div className="border-b border-gray-300 col-span-3">
    {/* <div className="pt-16 pb-8">
          <div className="text-3xl font-bold text-gray-900">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div> */}
    {/* <div>
          <ul className="flex flex-wrap text-xl">
            <li className="mr-6">
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            <li className="mr-6">
              <Link
                href="/about/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                About
              </Link>
            </li>
            <li className="mr-6">
              <a
                className="border-none text-gray-700 hover:text-gray-900"
                href="https://github.com/ixartz/Next-js-Boilerplate"
              >
                GitHub
              </a>
            </li>
            <li className="mr-6">
              <Link
                href="/blog/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div> */}
    <div className="header-innr flex justify-between">


      <div><div className="header-btn-traiger is-hidden"
        uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible">
        <span></span></div>


        <div id="logo">
          {/* <a href="feeds.html"> <img src="assets/images/logo.png" alt=""></a> */}
          {/* <a href="feeds.html"> <img src="assets/images/logo-light.png" className="logo-inverse" alt=""></a> */}
          hihi
        </div>
      </div>



      <div className="head_search">
        <form>
          <div className="head_search_cont">
            <input value="" type="text" className="form-control"
              placeholder="Search for Friends , Videos and more.." />
            <i className="s_icon uil-search-alt"></i>
          </div>


          <div uk-dropdown="pos: top;mode:click;animation: uk-animation-slide-bottom-small"
            className="dropdown-search display-hidden">


            <ul className="dropdown-search-list">
              <li className="list-title"> Recent Searches </li>
              <li> <a href="#">
                {/* <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
                <p> Erica Jones <span> 2 hours ago </span> </p>
              </a>
              </li>
              <li> <a href="#">
                {/* <img src="assets/images/avatars/avatar-3.jpg" alt=""> */}
                <p> Adrian Mohani <span> 13 days ago </span> </p>
              </a>
              </li>
              <li> <a href="#">
                {/* <img src="assets/images/avatars/avatar-4.jpg" alt=""> */}
                <p> Mountain Riders <span> 3 days ago <span>Group</span> </span> </p>
              </a>
              </li>
              <li> <a href="#">
                {/* <img src="assets/images/avatars/avatar-5.jpg" alt=""> */}
                <p> Coffee Addicts <span> 12 days ago <span> Page</span></span> </p>
              </a>
              </li>
              <li className="menu-divider"></li>
              <li className="list-footer"> <a href="your-history.html"> Searches History </a>
              </li>
            </ul>

          </div>


        </form>
      </div>


      <div className="head_user">


        <a href="#" className="opts_icon uk-visible@s" uk-tooltip="title: Create ; pos: bottom ;offset:7">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
          </svg>
        </a>


        <div uk-dropdown="mode:click ; pos: bottom-center ; animation: uk-animation-scale-up"
          className="icon-browse display-hidden">
          <a href="#" className="icon-menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#9c27b0"
                d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z">
              </path>
            </svg>
            Create Ad </a>
          <a href="#" className="icon-menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#009da0"
                d="M18,20H6V18H4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V18H18V20M14,2H6A2,2 0 0,0 4,4V12H6V4H14V8H18V12H20V8L14,2M11,16H8V14H11V16M16,16H13V14H16V16M3,14H6V16H3V14M21,16H18V14H21V16Z">
              </path>
            </svg>
            Create Blog </a>
          <a href="#" className="icon-menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#f25e4e"
                d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z">
              </path>
            </svg>
            Create Event </a>
          <a href="#" className="icon-menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#03A9F4"
                d="M12,6A3,3 0 0,0 9,9A3,3 0 0,0 12,12A3,3 0 0,0 15,9A3,3 0 0,0 12,6M6,8.17A2.5,2.5 0 0,0 3.5,10.67A2.5,2.5 0 0,0 6,13.17C6.88,13.17 7.65,12.71 8.09,12.03C7.42,11.18 7,10.15 7,9C7,8.8 7,8.6 7.04,8.4C6.72,8.25 6.37,8.17 6,8.17M18,8.17C17.63,8.17 17.28,8.25 16.96,8.4C17,8.6 17,8.8 17,9C17,10.15 16.58,11.18 15.91,12.03C16.35,12.71 17.12,13.17 18,13.17A2.5,2.5 0 0,0 20.5,10.67A2.5,2.5 0 0,0 18,8.17M12,14C10,14 6,15 6,17V19H18V17C18,15 14,14 12,14M4.67,14.97C3,15.26 1,16.04 1,17.33V19H4V17C4,16.22 4.29,15.53 4.67,14.97M19.33,14.97C19.71,15.53 20,16.22 20,17V19H23V17.33C23,16.04 21,15.26 19.33,14.97Z">
              </path>
            </svg>
            Create Groups </a>
          <a href="#" className="icon-menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#f79f58" d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z"></path>
            </svg>
            Create Page </a>
          <a href="#" className="icon-menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#8bc34a"
                d="M22,16V4A2,2 0 0,0 20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16M11,12L13.03,14.71L16,11L20,16H8M2,6V20A2,2 0 0,0 4,22H18V20H4V6">
              </path>
            </svg>
            Albums </a>
          <a href="#" className="more-app"> More Apps</a>
        </div>



        <a href="#" className="opts_icon" uk-tooltip="title: Messages ; pos: bottom ;offset:7">
          <svg viewBox="0 0 28 28" height="20" width="20" fill="currentColor"><path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path></svg> <span>4</span>
        </a>


        <div uk-dropdown="mode:click ; animation: uk-animation-slide-bottom-small"
          className="dropdown-notifications display-hidden">


          <div className="dropdown-notifications-content" data-simplebar>


            <div className="dropdown-notifications-headline">
              <h4>Messages</h4>
              <a href="#">
                <i className="icon-feather-settings"
                  uk-tooltip="title: Message settings ; pos: left"></i>
              </a>
            </div>


            <ul>
              <li>
                <a href="#">
                  <span className="notification-avatar status-online">
                    {/* <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
                  </span>
                  <div className="notification-text notification-msg-text">
                    <strong>Jonathan Madano</strong>
                    <p>Thanks for The Answer ... <span className="time-ago"> 2 h </span> </p>

                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-3.jpg" alt=""> */}
                  </span>
                  <div className="notification-text notification-msg-text">
                    <strong>Stella Johnson</strong>
                    <p> Alex will explain you how ... <span className="time-ago"> 3 h </span>
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar status-online">
                    {/* <img src="assets/images/avatars/avatar-1.jpg" alt=""> */}
                  </span>
                  <div className="notification-text notification-msg-text">
                    <strong>Alex Dolgove</strong>
                    <p> Alia just joined Messenger! <span className="time-ago"> 3 h </span> </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar status-online">
                    {/* <img src="assets/images/avatars/avatar-4.jpg" alt=""> */}
                  </span>
                  <div className="notification-text notification-msg-text">
                    <strong>Adrian Mohani</strong>
                    <p>Thanks for The Answer ... <span className="time-ago"> 2 h </span> </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
                  </span>
                  <div className="notification-text notification-msg-text">
                    <strong>Jonathan Madano</strong>
                    <p>Thanks for The Answer ... <span className="time-ago"> 2 h </span> </p>

                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-3.jpg" alt=""> */}
                  </span>
                  <div className="notification-text notification-msg-text">
                    <strong>Stella Johnson</strong>
                    <p> Alex will explain you how ... <span className="time-ago"> 3 h </span>
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-1.jpg" alt=""> */}
                  </span>
                  <div className="notification-text notification-msg-text">
                    <strong>Alex Dolgove</strong>
                    <p> Alia just joined Messenger! <span className="time-ago"> 3 h </span> </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-4.jpg" alt=""> */}
                  </span>
                  <div className="notification-text notification-msg-text">
                    <strong>Adrian Mohani</strong>
                    <p>Thanks for The Answer ... <span className="time-ago"> 2 h </span> </p>
                  </div>
                </a>
              </li>
            </ul>

          </div>
          <div className="dropdown-notifications-footer">
            <a href="#"> See all in Messages</a>
          </div>


        </div>



        <a href="#" className="opts_icon" uk-tooltip="title: Notifications ; pos: bottom ;offset:7">
          <svg viewBox="0 0 28 28" height="20" width="20"><path fill="currentColor" d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path></svg> <span>3</span>
        </a>



        <div uk-dropdown="mode:click ; animation: uk-animation-slide-bottom-small"
          className="dropdown-notifications display-hidden">


          <div className="dropdown-notifications-content" data-simplebar>


            <div className="dropdown-notifications-headline">
              <h4>Notifications </h4>
              <a href="#">
                <i className="icon-feather-settings"
                  uk-tooltip="title: Notifications settings ; pos: left"></i>
              </a>
            </div>


            <ul>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
                  </span>
                  <span className="notification-icon bg-gradient-primary">
                    <i className="icon-feather-thumbs-up"></i></span>
                  <span className="notification-text">
                    <strong>Adrian Moh.</strong> Like Your Comment On Video
                    <span className="text-primary">Learn Prototype Faster</span>
                    {/* <br> <span className="time-ago"> 9 hours ago </span> */}
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-3.jpg" alt=""> */}
                  </span>
                  <span className="notification-icon bg-gradient-danger">
                    <i className="icon-feather-star"></i></span>
                  <span className="notification-text">
                    <strong>Alex Dolgove</strong> Added New Review In Video
                    <span className="text-primary">Full Stack PHP Developer</span>
                    {/* <br> <span className="time-ago"> 19 hours ago </span> */}
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-4.jpg" alt=""> */}
                  </span>
                  <span className="notification-icon bg-gradient-success">
                    <i className="icon-feather-message-circle"></i></span>
                  <span className="notification-text">
                    <strong>Stella John</strong> Replay Your Comment in
                    <span className="text-primary">Adobe XD Tutorial</span>
                    {/* <br> <span className="time-ago"> 12 hours ago </span> */}
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
                  </span>
                  <span className="notification-icon bg-gradient-primary">
                    <i className="icon-feather-thumbs-up"></i></span>
                  <span className="notification-text">
                    <strong>Adrian Moh.</strong> Like Your Comment On Video
                    <span className="text-primary">Learn Prototype Faster</span>
                    {/* <br> <span className="time-ago"> 9 hours ago </span> */}
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-3.jpg" alt=""> */}
                  </span>
                  <span className="notification-icon bg-gradient-warning">
                    <i className="icon-feather-star"></i></span>
                  <span className="notification-text">
                    <strong>Alex Dolgove</strong> Added New Review In Video
                    <span className="text-primary">Full Stack PHP Developer</span>
                    {/* <br> <span className="time-ago"> 19 hours ago </span> */}
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="notification-avatar">
                    {/* <img src="assets/images/avatars/avatar-4.jpg" alt=""> */}
                  </span>
                  <span className="notification-icon bg-gradient-success">
                    <i className="icon-feather-message-circle"></i></span>
                  <span className="notification-text">
                    <strong>Stella John</strong> Replay Your Comment in
                    <span className="text-primary">Adobe XD Tutorial</span>
                    {/* <br> <span className="time-ago"> 12 hours ago </span> */}
                  </span>
                </a>
              </li>
            </ul>

          </div>


        </div>



        {/* <a className="opts_account" href="#"> <img src="assets/images/avatars/avatar-2.jpg" alt=""></a> */}


        <div uk-dropdown="mode:click ; animation: uk-animation-slide-bottom-small"
          className="dropdown-notifications rounded display-hidden">


          <a href="#">

            <div className="dropdown-user-details">

              <div className="dropdown-user-cover">
                {/* <img src="assets/images/avatars/profile-cover.jpg" alt=""> */}
              </div>
              <div className="dropdown-user-avatar">
                {/* <img src="assets/images/avatars/avatar-1.jpg" alt=""> */}
              </div>
              <div className="dropdown-user-name"> James Lewis </div>
            </div>

          </a>

          <ul className="dropdown-user-menu">
            <li><a href="#"> <i className="fas fa-rocket"></i> Boost Posts </a> </li>
            <li><a href="#"> <i className="fas fa-rocket"></i> Boost Pages </a> </li>
            <li><a href="#"> <i className="fas fa-bullhorn"></i> Advertising </a></li>
            <li><a href="#"> <i className="fas fa-user-edit"></i> General Settings</a></li>
            <li><a href="#"> <i className="fas fa-user-cog"></i> Admi Area</a></li>
            <li>
              <a href="#" id="night-mode" className="btn-night-mode">
                <i className="fas fa-moon"></i> Night mode
                <span className="btn-night-mode-switch">
                  <span className="uk-switch-button"></span>
                </span>
              </a>
            </li>
            <li><a href="form-login.html"> <i className="fas fa-sign-out-alt"></i>Log Out</a>
            </li>
          </ul>

          <hr className="m-0" />
          <ul className="dropdown-user-menu">
            <li><a href="page-setting.html" className="bg-secondery"> <i className="uil-bolt"></i>
              <div> Upgrade To Premium <span> Pro features give you complete control </span>
              </div>
            </a>
            </li>
          </ul>

        </div>


      </div>

    </div>
  </div>
}

const MainSidebar = () => {
  return <div className="main_sidebar col-span-1">
    <div className="side-overlay" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible"></div>
    <div className="sidebar-header">
      <h4> Navigation</h4>
      <span className="btn-close" uk-toggle="target: #wrapper ; cls: collapse-sidebar mobile-visible"></span>
    </div>
    <div className="left-sidebar" data-simplebar>


      <ul>
        {/* <li>
          <a href="timeline.html">
            <img src="assets/images/avatars/avatar-2.jpg" className="pro-icon" alt="">
              James Lewis
          </a>
        </li>
        <li className="sl_side_post_fltr">
          <a href="feeds.html">
            <img src="assets/images/icons/home.png" alt="">
              News Feed </a>
          <div className="dropdown order_by">
            <i className="dropdown-toggle fas fa-ellipsis-h"></i>
            <ul className="dropdown-menu dropdown-menu-right"
              uk-dropdown="pos:bottom-right; mode:click ; animation: uk-animation-slide-bottom-small">
              <li className="order_all "><a href="#">All</a></li>
              <li className="order_people active"><a href="#">People I Follow</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="albums.html">
            <img src="assets/images/icons/albums.png" alt=""> Albums </a>
        </li>
        <li>
          <a href="saved-post.html">
            <img src="assets/images/icons/save.png" alt=""> Saved Posts </a>
        </li>
        <li>
          <a href="explore.html">
            <img src="assets/images/icons/explore.png" alt=""> Explore </a>
        </li>
        <li>
          <a href="events.html">
            <img src="assets/images/icons/events.png" alt="">  Events </a>
        </li>
        <li>
          <a href="games.html">
            <img src="assets/images/icons/games.png" alt="">  Games </a>
        </li>
        <li id="more-veiw" hidden>
          <a href="offers.html">
            <img src="assets/images/icons/offers.png" alt="">  Offers </a>
        </li>
        <li id="more-veiw" hidden="">
          <a href="explore.html">
            <img src="assets/images/icons/find-freind.png" alt="">  Find friends </a>
        </li>
        <li id="more-veiw" hidden="">
          <a href="jobs.html">
            <img src="assets/images/icons/jobs.png" alt="">  Jobs </a>
        </li>
        <li id="more-veiw" hidden="">
          <a href="funding.html">
            <img src="assets/images/icons/founds.png" alt="">  Fundings </a>
        </li> */}

        <button className="btn-more" uk-toggle="target: #more-veiw; animation: uk-animation-fade">
          <span id="more-veiw"> <i className="icon-feather-chevron-down ml-2"></i> See all </span>
          <span id="more-veiw" hidden> <i className="icon-feather-chevron-up ml-2"></i> See less </span>
        </button>

        {/* <hr> */}
        <span className="left-sidebar-title"> Explore </span>

        <li>
          {/* <a href="group.html"> */}
          {/* <img src="assets/images/icons/groups.png" alt="">  Groups </a> */}
        </li>
        <li>
          {/* <a href="pages.html"> */}
          {/* <img src="assets/images/icons/pages.png" alt=""> Pages </a> */}
        </li>
        <li>
          {/* <a href="market.html"> */}
          {/* <img src="assets/images/icons/markets.png" alt="">  Market </a> */}
        </li>
        <li>
          {/* <a href="blog.html"> */}
          {/* <img src="assets/images/icons/document.png" alt="">  Blog </a> */}
        </li>
        <li>
          {/* <a href="jobs.html"> */}
          {/* <img src="assets/images/icons/jobs.png" alt="">  Jobs </a> */}
        </li>

      </ul>


      <div id="foot">

        <ul>
          <li> <a href="#"> About Us </a></li>
          <li> <a href="#"> Blog </a></li>
          <li> <a href="#"> Contact Us </a></li>
          <li> <a href="#"> Privacy Policy </a></li>
          <li> <a href="#"> Developers </a></li>
          <li> <a href="#"> Terms - Conditions </a></li>
        </ul>


        <div className="foot-content">
          <p>© 2020 <strong>Fortune</strong>. All Rights Reserved. </p>
        </div>

      </div>

    </div>

  </div>
};

const ChatSidebar = () => {
  return <>
    <a className="chat-plus-btn" href="#sidebar-chat" uk-toggle>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
      </svg>

    </a>
    <div id="sidebar-chat" className="sidebar-chat px-3" uk-offcanvas="flip: true; overlay: true">
      <div className="uk-offcanvas-bar">

        <div className="sidebar-chat-head mb-2">

          <div className="btn-actions">
            <a href="#" uk-tooltip="title: Search ;offset:7"
              uk-toggle="target: .sidebar-chat-search; animation: uk-animation-slide-top-small"> <i
                className="icon-feather-search"></i> </a>
            <a href="#" uk-tooltip="title: settings ;offset:7"> <i className="icon-feather-settings"></i> </a>
            <a href="#"> <i className="uil-ellipsis-v"></i> </a>
            <a href="#" className="uk-hidden@s"> <button className="uk-offcanvas-close uk-close" type="button"
              uk-close> </button> </a>
          </div>

          <h2> Chats </h2>
        </div>

        <div className="sidebar-chat-search" hidden>
          <input type="text" className="uk-input" placeholder="Search in Messages" />
          <span className="btn-close"
            uk-toggle="target: .sidebar-chat-search; animation: uk-animation-slide-top-small"> <i
              className="icon-feather-x"></i> </span>
        </div>

        <ul className="uk-child-width-expand sidebar-chat-tabs" uk-tab>
          <li className="uk-active"><a href="#">Users</a></li>
          <li><a href="#">Groups</a></li>
        </ul>

        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
            {/* <span className="online-dot"></span> </div> */}
            <h5> James Lewis </h5>
          </div>
        </a>

        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-1.jpg" alt=""> */}
            {/* <span className="online-dot"></span> </div> */}
            <h5> Erica Jones </h5>
          </div>
        </a>

        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-7.jpg" alt=""> */}
            {/* <span className="offline-dot"></span> </div> */}
            <h5> Stella Johnson </h5>
          </div>
        </a>

        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-5.jpg" alt=""> */}
            {/* <span className="offline-dot"></span> </div> */}
            <h5> Alex Dolgove </h5>
          </div>
        </a>
        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
            {/* <span className="online-dot"></span> </div> */}
            <h5> James Lewis </h5>
          </div>
        </a>
        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-4.jpg" alt=""> */}
            {/* <span className="online-dot"></span> </div> */}
            <h5> Erica Jones </h5>
          </div>
        </a>
        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-3.jpg" alt=""> */}
            {/* <span className="offline-dot"></span> </div> */}
            <h5> Stella Johnson </h5>
          </div>
        </a>
        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-5.jpg" alt=""> */}
            {/* <span className="offline-dot"></span> </div> */}
            <h5> Alex Dolgove </h5>
          </div>
        </a>
        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
            {/* <span className="online-dot"></span> </div> */}
            <h5> James Lewis </h5>
          </div>
        </a>
        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-4.jpg" alt=""> */}
            {/* <span className="online-dot"></span> </div> */}
            <h5> Erica Jones </h5>
          </div>
        </a>
        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-3.jpg" alt=""> */}
            {/* <span className="offline-dot"></span> </div> */}
            <h5> Stella Johnson </h5>
          </div>
        </a>
        <a href="#">
          <div className="contact-list">
            {/* <div className="contact-list-media"> <img src="assets/images/avatars/avatar-5.jpg" alt=""> */}
            {/* <span className="offline-dot"></span> </div> */}
            <h5> Alex Dolgove </h5>
          </div>
        </a>



      </div>
    </div>



  </>
}

const RightSidebar = () => {
  return <div className="uk-width-expand sl_sidebar col-span-1">

    <div className="sl_sidebar_sugs_title"> Trending !
      <i className="icon-feather-rotate-cw"></i>
    </div>
    <div className="list-group-item sl_htag">
      <a href="#">
        <span className="htag_top"> #hello</span>
      </a>
    </div>
    <div className="list-group-item sl_htag">
      <a href="#">
        <span className="htag_top"> #test</span>
      </a>
    </div>
    <div className="list-group-item sl_htag">
      <a href="#">
        <span className="htag_top"> #template</span>
      </a>
    </div>
    <div className="list-group-item sl_htag">
      <a href="#">
        <span className="htag_top"> #social</span>
      </a>
    </div>
    <div className="list-group-item sl_htag">
      <a href="#">
        <span className="htag_top"> #Fortune</span>
      </a>
    </div>
    <div className="list-group-item sl_htag">
      <a href="#">
        <span className="htag_top"> #new</span>
      </a>
    </div>

    <div className="sl_sidebar_sugs_title mt-4">Pro Members
      <i className="icon-feather-rotate-cw"></i>
    </div>
    <div className="uk-position-relative" uk-slider="finite: true; autoplay:true">

      <div className="uk-slider-container pb-3">

        <ul className="uk-slider-items uk-child-width-1-3@m uk-grid-small uk-grid sl_pro_users">
          <li>
            <a className="user" href="#">
              {/* <img src="assets/images/avatars/avatar-1.jpg" alt=""> */}
                <span>Stella Johnson 1</span>
            </a>
          </li>
          <li>
            <a className="user" href="#">
              {/* <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
                <span>Stella Johnson 2</span>
            </a>
          </li>
          <li>
            <a className="user" href="#">
              {/* <img src="assets/images/avatars/avatar-3.jpg" alt=""> */}
                <span>Stella Johnson 3</span>
            </a>
          </li>
          <li>
            <a className="user" href="#">
              {/* <img src="assets/images/avatars/avatar-4.jpg" alt=""> */}
                <span>Stella Johnson 4</span>
            </a>
          </li>
          <li>
            <a className="user" href="#">
              {/* <img src="assets/images/avatars/avatar-5.jpg" alt=""> */}
                <span>Stella Johnson 5</span>
            </a>
          </li>
        </ul>

        <a className="uk-position-center-left uk-hidden-hover slidenav-prev sl_pro_users_prev"
          href="#" uk-slider-item="previous"></a>
        <a className="uk-position-center-right-out uk-position-small uk-hidden-hover slidenav-next sl_pro_users_next"
          href="#" uk-slider-item="next"></a>

      </div>
    </div>

    <div className="sl_sidebar_sugs_title">People you may know
      <i className="icon-feather-rotate-cw"></i>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/avatars/avatar-1.jpg" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Jonathan Madano </a>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Follow</span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/avatars/avatar-6.jpg" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Monera Khalifa </a>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Accept</span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/avatars/avatar-3.jpg" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Adrian Mohani </a>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Follow</span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Stella Johnson </a>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Follow</span>
        </button>
      </div>
    </div>

    <div className="sl_sidebar_sugs_title mt-4">Pages you may like
      <i className="icon-feather-rotate-cw"></i>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/brand/brand-avatar-3.png" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Suranna Brand </a>
        <span> Education</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Like </span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/brand/brand-avatar-4.png" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Uk Brands </a>
        <span> Shopping</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Like </span>
        </button>
      </div>
    </div>

    <div className="sl_sidebar_sugs_title mt-4">Suggested groups
      <i className="icon-feather-rotate-cw"></i>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/group/group-2.jpg" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Coffee Addicts </a>
        <span> 6 Members</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Join </span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/group/group-1.jpg" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Architecture </a>
        <span> 12 Members</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Join </span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/group/group-3.jpg" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Mountain Riders </a>
        <span> 32 Members</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Join </span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/group/group-4.jpg" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Graphic Design </a>
        <span> 25 Members</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Join </span>
        </button>
      </div>
    </div>

    <div className="sl_sidebar_sugs_title mt-4">Online Users 1
    </div>

    <div className="sl_sidebar_sugs_title mt-1"> Invite Your Friends
      <i className="icon-feather-rotate-cw"></i>
    </div>
    <form action="#" className="invite-user-form">
      <div className="sl_form_fields invite-user-combine">
        <input type="text" name="email" placeholder="E-mail" className="form-control"/>
          <button className="button small" title="Send Invitation"><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
          </svg></button>
      </div>
    </form>


    <div className="sl_sidebar_sugs_title mt-4">Promoted Pages
      <i className="icon-feather-rotate-cw"></i>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/brand/brand-avatar-3.png" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Suranna Brand </a>
        <span> Education</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Like </span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/brand/brand-avatar-4.png" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Uk Brands </a>
        <span> Shopping</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Like </span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/brand/brand-avatar-1.png" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Reveal Store </a>
        <span> Shopping</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Like </span>
        </button>
      </div>
    </div>
    <div className="sl_sidebar_sugs">
      <div className="sl_sidebar_sugs_avatar">
        {/* <img src="assets/images/brand/brand-avatar-2.png" alt=""> */}
      </div>
      <div className="sl_sidebar_sugs_text">
        <a href="#" className="sl_user_link_name"> Phase Designers </a>
        <span> Design</span>
      </div>
      <div className="user-follow-button sl_sidebar_sugs_btns">
        <button type="button" className="button small">
          <span> Like </span>
        </button>
      </div>
    </div>






    <div className="footer-wrapper-sidebar mt-4">
      <div className="footer-powered">
        <p> © 2020 Fortune.net</p>
      </div>

    

        <ul className="list-inline">
          <li><a href="#">About</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#"> Privecy</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Developers</a></li>
          <li>
            <div className="dropdown dropup sun_foot_drop_menu">
              <a href="#" className="dropdown-toggle">
                More <span className="caret"></span>
              </a>
              <div uk-dropdown="pos: bottom-left ; mode:hover "
                className="uk-dropdown uk-dropdown-bottom-right"
                >
                <ul className="uk-nav uk-dropdown-nav">
                  <li><a href="#"> View as guast </a></li>
                  <li><a href="#"> Bloc this person </a></li>
                  <li><a href="#"> Report abuse</a></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <div className="clear"></div>
    </div>






  </div>
}

const StoryPops = () => {
  return <div className="story-pop uk-animation-slide-bottom-small">
    <div className="story-side uk-width-1-4@s">


      {/* <div className="story-side-search">
              <input type="text" className="uk-input" placeholder="Search user...."/>
              <i className="submit uil-search-alt"></i>
          </div>  */}

      <div className="uk-flex uk-flex-between uk-flex-middle mb-2">
        {/* <h2 className="mb-0" style="font-weight: 700">All Story</h2> */}
        <a href="#" className="text-primary"> Setting</a>
      </div>

      <div className="story-side-innr" data-simplebar>
        <h4 className="mb-1"> Your Story</h4>
        <ul className="story-side-list">
          <li>
            <a href="#">
              <div className="story-user-media">
                {/* <img src="assets/images/avatars/avatar-1.jpg" alt=""> */}
              </div>
              <div className="story-user-innr">
                <h5> Stella Johnson </h5>
                <p> Share a photo or video</p>
              </div>
              <div className="add-story-btn">
                <i className="uil-plus"></i>
              </div>
            </a>

          </li>
        </ul>

        <div className="uk-flex uk-flex-between uk-flex-middle my-3">
          <h4 className="m-0"> Friends Story</h4>
          <a href="#" className="text-primary"> See all</a>
        </div>
        <ul className="story-side-list"
          uk-switcher="connect: #story-slider-switcher ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium">

          <li>
            <a href="#">
              <div className="story-user-media">
                {/* <img src="assets/images/avatars/avatar-1.jpg" alt=""> */}
              </div>
              <div className="story-user-innr">
                <h5> James Lewis </h5>
                <p> <span className="story-count"> 2 new </span> <span className="story-time-ago"> 4hr ago
                </span></p>
              </div>
            </a>

          </li>
          <li>
            <a href="#">
              <div className="story-user-media">
                {/* <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
              </div>
              <div className="story-user-innr">
                <h5> Stella Johnson </h5>
                <p> <span className="story-count"> 3 new </span> <span className="story-time-ago"> 1hr ago
                </span></p>
              </div>
            </a>

          </li>
          <li>
            <a href="#">
              <div className="story-user-media">
                {/* <img src="assets/images/avatars/avatar-4.jpg" alt=""> */}
              </div>
              <div className="story-user-innr">
                <h5> Erica Jones </h5>
                <p> <span className="story-count"> 2 new </span> <span className="story-time-ago"> 3hr ago
                </span></p>
              </div>
            </a>

          </li>
          <li>
            <a href="#">
              <div className="story-user-media">
                {/* <img src="assets/images/avatars/avatar-7.jpg" alt=""> */}
              </div>
              <div className="story-user-innr">
                <h5> Adrian Mohani </h5>
                <p> <span className="story-count"> 1 new </span> <span className="story-time-ago"> 4hr ago
                </span></p>
              </div>
            </a>

          </li>
          <li>
            <a href="#">
              <div className="story-user-media">
                {/* <img src="assets/images/avatars/avatar-5.jpg" alt=""> */}
              </div>
              <div className="story-user-innr">
                <h5> Alex Dolgove </h5>
                <p> <span className="story-count"> 3 new </span> <span className="story-time-ago"> 7hr ago
                </span></p>
              </div>
            </a>

          </li>
          <li>
            <a href="#">
              <div className="story-user-media">
                {/* <img src="assets/images/avatars/avatar-1.jpg" alt=""> */}
              </div>
              <div className="story-user-innr">
                <h5> Stella Johnson </h5>
                <p> <span className="story-count"> 2 new </span> <span className="story-time-ago"> 8hr ago
                </span></p>
              </div>
            </a>

          </li>
          <li>
            <a href="#">
              <div className="story-user-media">
                {/* <img src="assets/images/avatars/avatar-2.jpg" alt=""> */}
              </div>
              <div className="story-user-innr">
                <h5> Erica Jones </h5>
                <p> <span className="story-count"> 3 new </span> <span className="story-time-ago"> 10hr ago
                </span></p>
              </div>
            </a>

          </li>
          <li>
            <a href="#">
              <div className="story-user-media">
                {/* <img src="assets/images/avatars/avatar-5.jpg" alt=""> */}
              </div>
              <div className="story-user-innr">
                <h5> Alex Dolgove </h5>
                <p> <span className="story-count"> 3 new </span> <span className="story-time-ago"> 14hr ago
                </span></p>
              </div>
            </a>

          </li>

        </ul>

      </div>

    </div>
    <div className="story-content">


      <span className="story-btn-close" uk-toggle="target: body ; cls: is-open"
        uk-tooltip="title:Close story ; pos: left "></span>

      <div className="story-content-innr">

        <ul id="story-slider-switcher" className="uk-switcher">

          <li>

            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>


              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/post/img-1.jpg" alt=""> */}
                  </div>
                </li>
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-1.jpg" alt=""> */}
                  </div>
                </li>
              </ul>


            </div>


          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>


              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div className="story-slider-image">
                    {/* <img src="assets/images/post/img-3.jpg" alt=""> */}
                  </div>
                </li>
                <li>
                  <div className="story-slider-image">
                    {/* <img src="assets/images/avatars/avatar-lg-3.jpg" alt=""> */}
                  </div>
                </li>
                <li>
                  <div className="story-slider-image">
                    {/* <img src="assets/images/avatars/avatar-lg-2.jpg" alt=""> */}
                  </div>
                </li>
              </ul>

            </div>

          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>

              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-4.jpg" alt=""> */}
                  </div>

                </li>
              </ul>
            </div>

          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>

              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-4.jpg" alt=""> */}
                  </div>

                </li>
              </ul>
            </div>

          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>

              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-4.jpg" alt=""> */}
                  </div>

                </li>
              </ul>
            </div>

          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>

              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-4.jpg" alt=""> */}
                  </div>

                </li>
              </ul>
            </div>

          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>

              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-4.jpg" alt=""> */}
                  </div>

                </li>
              </ul>
            </div>

          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>

              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-4.jpg" alt=""> */}
                  </div>

                </li>
              </ul>
            </div>

          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>

              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-4.jpg" alt=""> */}
                  </div>

                </li>
              </ul>
            </div>

          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>

              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-4.jpg" alt=""> */}
                  </div>

                </li>
              </ul>
            </div>

          </li>

          <li>



            <a href="#" uk-switcher-item="previous"
              className="uk-position-center-left-out uk-position-medium slidenav-prev"></a>
            <a href="#" uk-switcher-item="next"
              className="uk-position-center-right-out uk-position-medium slidenav-next"></a>

            <div className="uk-position-relative uk-visible-toggle" uk-slider>

              <ul className="uk-slider-nav uk-dotnav story-slider-nav"></ul>


              <ul className="uk-slider-items uk-child-width-1-1 story-slider">
                <li>
                  <div
                    className="story-slider-image uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
                    {/* <img src="assets/images/avatars/avatar-lg-4.jpg" alt=""> */}
                  </div>

                </li>
              </ul>
            </div>

          </li>

        </ul>







      </div>




    </div>
  </div>
}

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen grid grid-cols-3">

      <Header />
      <MainSidebar />

      <div className="content py-5 text-xl col-span-1">{props.children}</div>
      <RightSidebar/>
      {/* <ChatSidebar />
      <StoryPops /> */}

    </div>
  </div>
);

export { Main };
