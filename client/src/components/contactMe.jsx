import React from 'react';

export function ContactMe(){
  return (
    <div className='bg-secondary' id='contact-section'>
      <div className='container py-5'>
        <div id='contact-section-inner'>
          <div className="card mx-5">
            <div className='card-header bg-warning'>
              <h2 className="p-3 text-center text-dark font-weight-bold">Contact Me</h2>
            </div>
            <div className='card-body bg-dark text-warning p-4'>
              <form className='p-3' action="mailto:david19961113@gmail.com" method="post" encType="text/plain">
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label className='ml-2 text-left' htmlFor="FirstName">First Name</label>
                    <input type="text" className="form-control" name="FirstName" id="FirstName" />
                  </div>
                  <div className="col-sm-6">
                    <label className='ml-2 text-left' htmlFor="LastName">Last Name</label>
                    <input type="text" className="form-control" name="LastName" id="LastName"/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label className='ml-2 text-left' htmlFor="EmailAddress">Email Address</label>
                    <input type="email" className="form-control" name="Email" id="EmailAddress"/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label className='ml-2 text-left' htmlFor="Message">Message</label>
                    <textarea rows="12" className="form-control" name="Comments" id='Message' />
                  </div>
                </div>
                <button className="btn btn-lg btn-block btn-warning my-2" type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
