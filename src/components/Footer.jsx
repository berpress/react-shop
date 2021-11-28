import React, { Component }  from 'react';

function Footer() {
  return (
      <footer className='page-footer lighten-4'>
          <div className='footer-copyright'>
              <div className='container'>
                  © {new Date().getFullYear()} Copyright Text
                  <a
                      className='grey-text text-lighten-4 right'
                      href='https://github.com/berpress'
                      rel='noreferrer'
                      target='_blank'
                  >
                      Repo
                  </a>
              </div>
          </div>
      </footer>
  );
}

export { Footer };