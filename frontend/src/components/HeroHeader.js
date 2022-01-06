import React from "react";
import { MDBContainer, MDBCol, MDBCard, MDBIcon, MDBBtn } from "mdbreact";

const HeroHeader = () => {
  return (
  <section className="text-center my-5">
   

    <MDBContainer className="d-flex flex-wrap">
      <MDBCol md="12" className="mb-4">
        <MDBCard className="card-image" style={{
                backgroundImage:
                  "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9) ), url('../../images/headerimg.jpg')"

              }}>
          <h2 className="h1-responsive font-weight-bold my-5 text-light">
            Our best Products
            </h2>
            <p className="text-light w-responsive mx-auto mb-5">
            Antique pieces can be difficult to find. Often, you have to peruse the flea market or go to specialty stores just to hunt for authentic antique items. And in some cases, antique stores and sellers can be difficult to find, too. That’s why online shopping is a godsend. Shopping for antiques online can bring you almost everything you’re looking for without requiring you to leave your home.

              <br/>
              <br/>
              If you’re into vintage shopping, you’re in luck: we’ve searched the internet and complied a complete list of online antique stores for your convenience.

            </p>
        </MDBCard>
      </MDBCol>
     
    </MDBContainer>
  </section>
  );
}

export default HeroHeader;