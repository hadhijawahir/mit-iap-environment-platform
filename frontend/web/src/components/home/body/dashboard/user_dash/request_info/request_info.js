import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RequestContext } from "../../../../../utility/contexts/requestContext";
import "./request_info.css";
import axios from "axios";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import Avatar from "../../../../../../asserts/images/avatar.png";
import { Grid } from "@material-ui/core";
import { Map, CircleMarker, TileLayer, Polygon } from "react-leaflet";

const Requset = () => {
  let history = useHistory();
  const [id, title, state, body] = useContext(RequestContext);
  const [loading] = useState(null);
  const [comments, setComments] = useState(null);
  const [reply, setReply] = useState("");

  const handleSubmit = event => {
    axios
      .post(
        "http://0.0.0.0:9080/user-services/post-comment/" + id + "/yashod",
        { body: reply }
      )
      .then(response => {
        console.log(response.data);
        setReply("");
        axios
          .get("http://0.0.0.0:9080/user-services/get-comments/" + id)
          .then(response => {
            setComments(response.data);
          })
          .catch();
      })
      .catch();
  };

  useEffect(() => {
    axios
      .get("http://0.0.0.0:9080/user-services/get-comments/" + id)
      .then(response => {
        setComments(response.data);
      })
      .catch();
  }, [loading, id]);
  return (
    <Fragment>
      <button
        className="btn btn-info request-button"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </button>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              <h1> {title}</h1>
            </div>
            <div className="card-body">
              <h4>Status of the Request: {state}</h4>
              <hr />
              <h4>Description : {body}</h4>
              <Map
                style={{ height: "480px", width: "100%" }}
                //zoomed to center on given coords
                bounds={[
                  [1.022443, 8.260258],
                  [5.815325, 8.692459]
                ]}
              >
                <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polygon //blue polygon for given coords
                  positions={[
                    [1.022443, 8.260258],
                    [5.815325, 8.692459]
                  ]}
                />
              </Map>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <Comment.Group size="large">
            <Header as="h3" dividing>
              Process of the Request
            </Header>

            {comments != null ? (
              comments.map(comment => (
                <Comment key={comment.commentId}>
                  <Comment.Avatar
                    src={Avatar}
                    alt="WSO2"
                    width="40"
                    height="40"
                  />
                  <Comment.Content>
                    <Comment.Author as="a">{comment.user}</Comment.Author>
                    <Comment.Text>{comment.comment}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              ))
            ) : (
              <h3>no</h3>
            )}
            <br />
            <Form>
              <Form.Field>
                <input
                  type="text"
                  value={reply}
                  onChange={event => setReply(event.target.value)}
                />
              </Form.Field>
              <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
                onClick={() => handleSubmit()}
              />
            </Form>
          </Comment.Group>
        </div>
      </div>
    </Fragment>
  );
};

export default Requset;
