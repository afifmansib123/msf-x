import React from "react";
import Image from "next/image";
import ProfileImg from "../../assets/img/profile/profile-default.svg";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const ProfileView = ({ data }) => {
      return (
            <><Card>
                  <CardHeader color={"bhalogari"} className={"m-3"}>
                        <h1 className="text-left text-xl font-semibold"> {data.first_name} {data.last_name}</h1>
                        {/* <p className={classes.cardCategoryWhite}>
      Change the remaining usage of a card
    </p> */}
                  </CardHeader>
                  <CardBody>

                        <div className="flex ">
                              <div className="mt-5 border-4 border-white rounded-full flex items-center">
                                    <Image className="rounded-full pt-2"
                                          unoptimized
                                          src={data.image ? data.image : ProfileImg}
                                          alt="Profile Image"
                                          width={135}
                                          height={135} />
                              </div>
                             

                              <div className="right ml-10 mt-4">

                                    {/* <h3 className="text-xl font-bold mb-2 mt-2">{value.first_name} {value.last_name} ({value.gender}) </h3> */}
                                    <div className="flex">
                                    <h3 className="text-base font-bold mr-2">Contact: </h3>
                                    <h3 className="text-base">{data.contact_number}</h3>
                                    </div>
                                    <div className="flex">
                                    <h3 className="text-base font-bold mr-2">Email: </h3>
                                    <h3 className="text-base ">{data.email}</h3>
                                    </div>
                                    <div className="flex">
                                    <h3 className="text-base font-bold mr-2">Address: </h3>
                                          <h3 className="text-base "> {data.address}</h3>
                                          </div>
                                    <div>
                                    {data.tin_number !== "undefined" && (
                                    <div className="flex"><h3 className="text-base font-bold mr-2">TIN Number: </h3><h3 className="text-base "> {data.tin_number}</h3></div>
                                    )}
                                    {data.tin_number === "undefined" && (
                                    <div className="flex"><h3 className="text-base font-bold mr-2">TIN Number: </h3><h3 className="text-base "> - </h3></div>
                                    )}
                                          </div>

                                    <div className="flex">
                                    <h3 className="text-base font-bold mr-2">Date of Birth:</h3>
                                          <h3 className="text-base ">{data.date_of_birth}</h3>
                                          </div>
                                    <div className="flex"> 
                                    <h3 className="text-base font-bold mr-2">NID:</h3>
                                    <h3 className="text-base "> {data.nid_number}</h3>
                                    </div>
                                

                                  
                                    <div>
                                    {data.gender === "M" && (
                                                      <div className="flex ">
                                                            <div>
                                                            <h3 className="text-base font-bold ">Gender: </h3>
                                                            </div>
                                                            <h3 className="text-base ml-2 ">Male</h3>
                                                      </div>
                                                )}
                                                {data.gender === "F" && (
                                                      <div className="flex ">
                                                            <div>
                                                            <h3 className="text-base font-bold">Gender: </h3>
                                                            </div>
                                                            <h3 className="text-base ml-2 ">Female</h3>
                                                      </div>
                                                )}  
                                    </div>
                                    <div className="flex font-bold mt-2 ">
                                    <h2 className="my-0 font-sans text-lg from-neutral-500 font-semibold p-0 m-0 mb-4 mr-2">
                                          Profile Type:
                                    </h2>
                                    <Stack direction="row" spacing={1}>

                                          <Chip label={data.individual_user ? "Individual" : "Business"} color="warning" />
                                    </Stack>
                              </div>
                             


                                   
                                    </div>
                                  

                              </div>
                              {/* <div className="flex flex-col sm:flex-row sm:justify-right sm:px-14"> */}
                              {/* <div className="flex">
                                    <h2 className="my-5 font-sans text-xl from-neutral-500 font-semibold p-0 m-0 mb-4">
                                          Profile Type:
                                    </h2>
                                    <div className="flex items-center ml-2">
                                          <span className="bg-orange-600 font-sans font-bold text-white py-3 px-5 rounded-full transition-all">
                                                {data.individual_user ? "Individual" : "Business"}
                                          </span>
                                    </div> */}
                             
                              {/* </div>
                              </div> */}


                  </CardBody>
            </Card>
            {/* <div className="flex justify-center">
                        <div className="rounded-xl shadow-md py-2 px-6 box-border bg-gray-100 w-full md:w-5/6">
                              <div className="flex justify-center">
                                    <div className="mt-5 border-4 border-white rounded-full flex items-center">
                                          <Image className="rounded-full pt-2"
                                                unoptimized
                                                src={data.image ? data.image : ProfileImg}
                                                alt="Profile Image"
                                                width={135}
                                                height={135} />
                                    </div>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:justify-between sm:px-14">
                                    {/* <div className="flex">
                                          <h2 className="my-5 font-sans text-xl from-neutral-500 font-semibold p-0 m-0 mb-4">
                                                Profile Type:
                                          </h2>
                                          <div className="flex items-center ml-2">
                                                <span className="bg-orange-600 font-sans font-bold text-white py-3 px-5 rounded-full transition-all">
                                                      {data.individual_user ? "Individual" : "Business"}
                                                </span>
                                          </div>
                                    </div> */}

                                    {/* <div className="flex">
                                          <h2 className="my-5 font-sans text-xl from-neutral-500 font-semibold p-0 m-0 mb-4">
                                                Subscription:
                                          </h2>
                                          <div className="flex items-center ml-2">
                                                <span className="bg-orange-600 font-sans font-bold text-white py-3 px-5 rounded-full transition-all">Gold</span>
                                          </div>
                                    </div>
                              </div>

                              <div className="grid md:grid-cols-2 justify-items-center xs:grid-cols-1">
                                    {data.first_name && (
                                          <div className="rounded-xl shadow-md mx-0 my-2.5 py-8 px-10 box-border bg-white w-full sm:w-5/6">
                                                <div>
                                                      <h2 className="font-sans text-sm p-0 m-0 mb-4">Account Name</h2>
                                                </div>
                                                <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words">
                                                      {data.first_name} {data.last_name}
                                                </p>
                                          </div>
                                    )}
                                    {data.tin_number !== null && (
                                          <div className="rounded-xl shadow-md mx-0 my-2.5 py-8 px-10 box-border bg-white w-full sm:w-5/6">
                                                <div>
                                                      <h2 className="font-sans text-sm p-0 m-0  mb-4">TIN Number</h2>
                                                </div>
                                                <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words">
                                                      {data.tin_number}
                                                </p>
                                          </div>
                                    )}
                                    {data.contact_number && (
                                          <div className="rounded-xl shadow-md mx-0 my-2.5 py-8 px-10 box-border bg-white w-full sm:w-5/6">
                                                <div>
                                                      <h2 className="font-sans text-sm p-0 m-0  mb-4">Contact</h2>
                                                </div>
                                                <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words">
                                                      {data.contact_number}
                                                </p>
                                          </div>
                                    )}
                                    {data.bida_number !== null && (
                                          <div className="rounded-xl shadow-md mx-0 my-2.5 py-8 px-10 box-border bg-white w-full sm:w-5/6">
                                                <div>
                                                      <h2 className="font-sans text-sm p-0 m-0  mb-4">BIN</h2>
                                                </div>
                                                <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words">
                                                      444222555643
                                                </p>
                                          </div>
                                    )}
                                    {data.address && (
                                          <div className="addressCopy rounded-xl shadow-md mx-0 my-2.5 py-8 px-10 box-border bg-white w-full sm:w-5/6">
                                                <div>
                                                      <h2 className="font-sans text-sm p-0 m-0  mb-4">Address</h2>
                                                </div>
                                                <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words">
                                                      {data.address}
                                                </p>
                                          </div>
                                    )}
                                    {data.nid_number && (
                                          <div className="rounded-xl shadow-md mx-0 my-2.5 py-8 px-10 box-border bg-white w-full sm:w-5/6">
                                                <div>
                                                      <h2 className="font-sans text-sm p-0 m-0  mb-4">NID</h2>
                                                </div>
                                                <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words">
                                                      {data.nid_number}
                                                </p>
                                          </div>
                                    )}
                                    {(data.date_of_birth || data.gender) && (
                                          <div className="rounded-xl shadow-md mx-0 my-2.5 py-8 px-10 box-border bg-white w-full sm:w-5/6">
                                                {data.date_of_birth && (
                                                      <div className="flex justify-between">
                                                            <div>
                                                                  <h2 className="font-sans text-sm p-0 m-0  mb-4">
                                                                        Date of Birth
                                                                  </h2>
                                                            </div>
                                                            <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words">
                                                                  {data.date_of_birth}
                                                            </p>
                                                      </div>
                                                )}
                                                <hr className="border-1 solid" />
                                                {data.gender === "M" && (
                                                      <div className="flex justify-between">
                                                            <div>
                                                                  <h2 className="font-sans text-sm p-0 m-0 mt-4">Gender</h2>
                                                            </div>
                                                            <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words mt-4">
                                                                  Male
                                                            </p>
                                                      </div>
                                                )}
                                                {data.gender === "F" && (
                                                      <div className="flex justify-between">
                                                            <div>
                                                                  <h2 className="font-sans text-sm p-0 m-0 mt-4">Gender</h2>
                                                            </div>
                                                            <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words mt-4">
                                                                  Female
                                                            </p>
                                                      </div>
                                                )}
                                          </div>
                                    )}
                                    {data.email && (
                                          <div className="rounded-xl shadow-md mx-0 my-2.5 py-8 px-10 box-border bg-white w-full sm:w-5/6">
                                                <div>
                                                      <h2 className="font-sans text-sm p-0 m-0 mb-4">Email</h2>
                                                </div>
                                                <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words">
                                                      {data.email}
                                                </p>
                                          </div>
                                    )}
                                    {data.post_code && (
                                          <div className="rounded-xl shadow-md mx-0 my-2.5 py-8 px-10 box-border bg-white w-full sm:w-5/6">
                                                <div>
                                                      <h2 className="font-sans text-sm p-0 m-0 mb-4">Zip Code</h2>
                                                </div>
                                                <p className="font-sans text-sm font-semibold pb-3.5 px-0 pt-0 m-0 break-words">
                                                      {data.post_code}
                                                </p>
                                          </div>
                                    )}

                              </div> */}
                        {/* </div> 
                  </div> */}
                  </>
      );
};
export default ProfileView;