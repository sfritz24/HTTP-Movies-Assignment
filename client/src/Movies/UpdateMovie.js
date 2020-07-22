import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
  };