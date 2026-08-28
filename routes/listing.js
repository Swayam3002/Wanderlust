const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js")


//Index Route
router.get("/",wrapAsync(async (req, res) => {
   const allListings = await listing.find({});
   res.render("listings/index.ejs", {allListings});  
}));

//NEW ROUTE
router.get("/new", isLoggedIn, (req,res) => {
    res.render("listings/new.ejs"); 
});


//SHOW ROUTE
router.get("/:id", wrapAsync(async (req,res) =>{
    let {id} = req.params;
   const listings = await Listing.findById(id).populate("reviews").populate("owner");
   if (!listings) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
   }
   console.log(listings);
   res.render("listings/show.ejs", { listings });
}));

//CREATE ROUTE
router.post("/", isLoggedIn, validateListing, wrapAsync(async ( req,res,next ) => {   
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res)=> {
    let {id} = req.params;
    const listings = await listing.findById(id);
      if (!listings) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
   }
    res.render("listings/edit.ejs", {listings}); 
}));

//UPDATE ROUTE
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id ,{...req.body.listing });
     req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

//DELETE ROUTE
router.delete("/:id" , isLoggedIn, isOwner, wrapAsync(async (req, res)=>{
    let {id} = req.params;
   let deletedListing =  await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;