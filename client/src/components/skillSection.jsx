import React from 'react';

export function SkillSection(){
  return(
    <div id="skill-section">
      <div className="py-5 animated container">
        <h2 className="py-3 text-center font-weight-bold">Skills</h2>
        <hr className="w-25"/>
        <div className="py-5 row">
          <div className="col-lg-3 col-md-3 col-sm-3">
            <button className="btn btn-outline-dark btn-circle" data-target="#carouselExampleCaptions" data-slide-to="0"><i className="fab fa-html5 fa-2x"></i></button><div className="vertical-line"></div>
            <button className="btn btn-outline-dark btn-circle" data-target="#carouselExampleCaptions" data-slide-to="1"><i className="fab fa-css3-alt fa-2x"></i></button><div className="vertical-line"></div>
            <button className="btn btn-outline-dark btn-circle" data-target="#carouselExampleCaptions" data-slide-to="2"><i className="fab fa-js-square fa-2x"></i></button><div className="vertical-line"></div>
            <button className="btn btn-outline-dark btn-circle" data-target="#carouselExampleCaptions" data-slide-to="3"><i className="fab fa-react fa-2x"></i></button>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3">
            <button className="btn btn-outline-dark btn-circle" data-target="#carouselExampleCaptions" data-slide-to="4"><i className="fab fa-node-js fa-2x"></i></button><div className="vertical-line"></div>
            <button className="btn btn-outline-dark btn-circle" data-target="#carouselExampleCaptions" data-slide-to="5"><i className="fas fa-database fa-lg"></i></button><div className="vertical-line"></div>
            <button className="btn btn-outline-dark btn-circle" data-target="#carouselExampleCaptions" data-slide-to="6"><i className="fab fa-github fa-2x"></i></button><div className="vertical-line"></div>
            <button className="btn btn-outline-dark btn-circle" data-target="#carouselExampleCaptions" data-slide-to="7"><i className="fab fa-python fa-2x"></i></button>
          </div>
          <div id="carouselExampleCaptions" className="col-lg-6 col-md-6 col-sm-6 carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <h3 className="font-weight-bold">HTML</h3>
                  <br/>
                  <p>Hypertext Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.</p>
                  <p>Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>
                </div>
                <div className="carousel-item">
                  <h3 className="font-weight-bold">CSS</h3>
                  <br/>
                  <p>Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.</p>
                  <p>CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts.</p>
                </div>
                <div className="carousel-item">
                  <h3 className="font-weight-bold">JavaScript</h3>
                  <br/>
                  <p>JavaScript, often abbreviated as JS, is a high-level, interpreted scripting language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.</p>
                  <p>Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications.</p>
                </div>
                <div className="carousel-item">
                  <h3 className="font-weight-bold">ReactJS</h3>
                  <br/>
                  <p>React (also known as React.js or ReactJS) is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.</p>
                  <p>React can be used as a base in the development of single-page or mobile applications, as it is optimal for fetching rapidly changing data that needs to be recorded.</p>
                </div>
                <div className="carousel-item">
                  <h3 className="font-weight-bold">Node.js</h3>
                  <br/>
                  <p>Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. </p>
                </div>
                <div className="carousel-item">
                  <h3 className="font-weight-bold">MongoDB</h3>
                  <br/>
                  <p>MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License (SSPL).</p>
                </div>
                <div className="carousel-item">
                  <h3 className="font-weight-bold">GitHub</h3>
                  <br/>
                  <p>GitHub is an American company that provides hosting for software development version control using Git.</p>
                  <p>It offers all of the distributed version control and source code management (SCM) functionality of Git as well as adding its own features. It provides access control and several collaboration features such as bug tracking, feature requests, task management, and wikis for every project.</p>
                </div>
                <div className="carousel-item">
                  <h3 className="font-weight-bold">Python</h3>
                  <br/>
                  <p>Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991, Python's design philosophy emphasizes code readability with its notable use of significant whitespace. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
