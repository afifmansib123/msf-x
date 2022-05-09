import React from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import MSF from "layouts/MSF.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ReadMore from '../../components/ReadMore/ReadMore';

function Subscriptions() {
  return (
    // <div>
    // </div>
    <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                
                {/* <CardHeader className="text-center text-2xl font-bold">
                        <div className="p-1 rounded-lg text-white bg-[#f06424]">
                            <p>Individual Basic</p>
                            <p>(Silver)</p>
                        </div>
                </CardHeader> */}
                 <div class="w-36 h-36 bg-[#f06424] rounded-full"></div>
                <Card>
                {/* <h3>user</h3> */}
                    <CardHeader className="text-center text-2xl font-bold">
                        <div className="p-1 rounded-lg text-white bg-[#f06424]">
                            <p>Individual Basic</p>
                            <p>(Silver)</p>
                        </div>
                    </CardHeader>

                    <CardHeader>
                        <div className="text-center font-bold text-[#f06424]">
                            <p className="text-4xl">TK. 500</p>
                            <p className="text-2xl">Per Ad Post</p>
                        </div>
                    </CardHeader>
                    {/* <CardHeader className="text-center text-2xl font-bold"></CardHeader> */}
                    <CardBody>
                        <ReadMore>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit nunc id urna scelerisque, sed iaculis ligula feugiat. Nulla facilisis, nisi et pharetra ultrices, 
                            nisi enim interdum neque, in elementum magna lacus non urna. Etiam convallis euismod porttitor. In odio magna, efficitur placerat sem sed, gravida sodales nulla. Nulla facilisi. 
                            Ut ex urna, vestibulum a consequat quis, mollis sit amet orci. Integer eu vehicula nisl. Phasellus dignissim nunc velit, vitae ultrices purus tristique id. Mauris mauris nisi, efficitur 
                            eu mauris non, fermentum interdum dui. Aliquam venenatis accumsan sapien, sed finibus turpis interdum quis. Sed fringilla erat nunc. Curabitur purus augue, ornare a varius in, laoreet 
                            vel ex. In laoreet turpis eu quam vulputate, id convallis neque efficitur. Vivamus fringilla tincidunt lectus in accumsan.
                        </ReadMore>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <div class="w-36 h-36 bg-[#f06424] rounded-full"></div>
                <Card>
                {/* <h3>user</h3> */}
                    <CardHeader className="text-center text-2xl font-bold">
                        <div className="p-1 rounded-lg text-white bg-[#f06424]">
                            <p>Business Regular</p>
                            <p>(Gold)</p>
                        </div>
                    </CardHeader>

                    <CardHeader>
                        <div className="text-center font-bold text-[#f06424]">
                            <p className="text-4xl">TK. 12,000</p>
                            <p className="text-2xl">Per Month</p>
                        </div>
                    </CardHeader>
                    {/* <CardHeader className="text-center text-2xl font-bold">Gold</CardHeader> */}
                    <CardBody>
                        <ReadMore>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit nunc id urna scelerisque, sed iaculis ligula feugiat. Nulla facilisis, nisi et pharetra ultrices, 
                            nisi enim interdum neque, in elementum magna lacus non urna. Etiam convallis euismod porttitor. In odio magna, efficitur placerat sem sed, gravida sodales nulla. Nulla facilisi. 
                            Ut ex urna, vestibulum a consequat quis, mollis sit amet orci. Integer eu vehicula nisl. Phasellus dignissim nunc velit, vitae ultrices purus tristique id. Mauris mauris nisi, efficitur 
                            eu mauris non, fermentum interdum dui. Aliquam venenatis accumsan sapien, sed finibus turpis interdum quis. Sed fringilla erat nunc. Curabitur purus augue, ornare a varius in, laoreet 
                            vel ex. In laoreet turpis eu quam vulputate, id convallis neque efficitur. Vivamus fringilla tincidunt lectus in accumsan.
                        </ReadMore>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
            <div class="w-36 h-36 bg-[#f06424] rounded-full"></div>
                <Card>
                {/* <h3>user</h3> */}
                    <CardHeader className="text-center text-2xl font-bold">
                        <div className="p-1 rounded-lg text-white bg-[#f06424]">
                            <p>Business Plus</p>
                            <p>(Diamond)</p>
                        </div>
                    </CardHeader>

                    <CardHeader>
                        <div className="text-center font-bold text-[#f06424]">
                            <p className="text-4xl">TK. 20,000</p>
                            <p className="text-2xl">Per Month</p>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <ReadMore>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit nunc id urna scelerisque, sed iaculis ligula feugiat. Nulla facilisis, nisi et pharetra ultrices, 
                            nisi enim interdum neque, in elementum magna lacus non urna. Etiam convallis euismod porttitor. In odio magna, efficitur placerat sem sed, gravida sodales nulla. Nulla facilisi. 
                            Ut ex urna, vestibulum a consequat quis, mollis sit amet orci. Integer eu vehicula nisl. Phasellus dignissim nunc velit, vitae ultrices purus tristique id. Mauris mauris nisi, efficitur 
                            eu mauris non, fermentum interdum dui. Aliquam venenatis accumsan sapien, sed finibus turpis interdum quis. Sed fringilla erat nunc. Curabitur purus augue, ornare a varius in, laoreet 
                            vel ex. In laoreet turpis eu quam vulputate, id convallis neque efficitur. Vivamus fringilla tincidunt lectus in accumsan.
                        </ReadMore>
                    </CardBody>
                </Card>
            </GridItem>
    </GridContainer>        
  )
}


Subscriptions.layout = MSF;

export default Subscriptions