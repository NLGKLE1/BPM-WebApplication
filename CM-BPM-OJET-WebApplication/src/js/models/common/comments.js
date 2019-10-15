define([],
    function () {
        let commentList = [];
        let newCommentID;

        function processGetComments(getCommentsByCommentListIdResponse) {
            commentList = [];
            commentList = getCommentsByCommentListIdResponse;
        };

        function processCreateComment(createCommentsResponse) {
            newCommentID = createCommentsResponse;
        };

        return {
            getCommentsByCommentListId: function (commentlistidParam, observable) {
                return evt.getServiceData(
                    'PR',
                    'getCommentsByCommentListId', {
                        commentlistid: commentlistidParam
                    }, {},
                    'message.data.comments', processGetComments
                ).then(function () {
                    observable(commentList);
                });
            },
            createComments: function (pageDataParams,observable) {
                return evt.getServiceData(
                    'PR',
                    'createComments',
                    {}, {
                        commentlistid: pageDataParams.commentlistid,
                        commenttext: pageDataParams.commenttext
                    },
                    'message.data', processCreateComment
                ).then(function () {
                    observable(newCommentID);
                });
            }
        }
    }
);
