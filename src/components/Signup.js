import { useState, useEffect } from 'react';
import { Button, Row, Col, Form, InputGroup, Alert } from "react-bootstrap"
import { useHistory } from 'react-router-dom';


const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword:'',
  })
  const [error, setError] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  })
  const [submit, setSubmit] = useState(false)
  const [success, setSuccess] = useState(false)
  const history = useHistory();
  const fullName = localStorage.getItem('FullName');
  useEffect(() => {
    if (submit && !Object.values(error).includes(true)) {
      setSuccess(true);
      if(success){
        localStorage.setItem('FullName', userDetails?.fullName);
        localStorage.setItem('Email', userDetails?.email);
        localStorage.setItem('Password', userDetails?.password);
        localStorage.setItem('accessToken', makeid(16));
        history.push("/profile");
      }
      // setUserDetails({
      //   fullName: '',
      //   email: '
      //   password: '',

      // })
    }
  }, [submit, error, success])
 useEffect(()=>{
   if(fullName != null){
      history.push("/profile")
   }
 }, [fullName])

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true)

    const { fullName, email, password,confirmPassword} = userDetails

    if (fullName.length >= 2) {
      setError((previousError) => ({
        ...previousError,
        fullName: false
      }))
    } else {
      setError((previousError) => ({
        ...previousError,
        fullName: true
      }))
    }


    if (
      email.includes("@") &&
      email.includes(".") &&
      email.indexOf("@") !== 0 &&
      email.length - email.lastIndexOf(".") >= 3
    ) {
      setError((previousError) => ({
        ...previousError,
        email: false
      }))
    } else {
      setError((previousError) => ({
        ...previousError,
        email: true
      }))
    }
    if (password.length >= 2) {
      setError((previousError) => ({
        ...previousError,
        password: false
      }))
    } else {
      setError((previousError) => ({
        ...previousError,
        password: true
      }))
    }
   if (confirmPassword === password) {
      setError((previousError) => ({
        ...previousError,
        confirmPassword: false
      }))
    } else {
      setError((previousError) => ({
        ...previousError,
        confirmPassword: true
      }))
    }
  };

  return (
  
    <>
    <div className="signup">
      <h1 className="signup-title">Sign Up</h1>
      {success && (
        <Alert variant="success">Your details were saved successfully!</Alert>
      )  }
      <Form onSubmit={handleSubmit}>
        <Row  className="mb-3 row-control">
          <Form.Group as={Col} md="" controlId="validationCustom01">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full name"
              value={userDetails.fullName}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  fullName: e.target.value,
                })
              }
            />
            {submit && !success && (error.fullName ? (
              <Form.Control.Feedback type="invalid">
                Please enter a valid full name
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            ))}
          </Form.Group>

          <Form.Group as={Col} md="" controlId="validationCustomUsername">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    email: e.target.value,
                  })
                }
              />
              {submit && !success && (error.email ? (
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              ))}
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="" controlId="validationCustom01">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  password: e.target.value,
                })
              }
            />
            {submit && !success && (error.password ? (
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            ))}
          </Form.Group>

          <Form.Group as={Col} md="" controlId="validationCustom01">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={userDetails.confirmPassword}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  confirmPassword: e.target.value,
                })
              }
            />
            {submit && !success && ((error.password !== error.confirmPassword) ? (
              <Form.Control.Feedback type="invalid">
                Password does'nt match 
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            ))}
          </Form.Group>
          <Button variant="dark" style={{width:'200px', margin:'20px', marginLeft: '120px'}}type="submit">Signup</Button>
        </Row>
      </Form>
      </div>
    </>
  
  );
};

export default Signup;
