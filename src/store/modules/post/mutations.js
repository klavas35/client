export default {
  post(state, payload) {
    const postData = [];
    const previewData = [];
    payload.forEach(data => {
      const post = {
        author: {
          name: data.user.userName
        },
        body: {
          title: data.body.title,
          message: data.body.message
        },
        _id: data._id,
        date: data.createdAt
      };
      const previewPost = {
        author: {
          name: data.user.userName
        },
        body: {
          titleMethod: () => {
            const titlePreview = data.body.title;
            if (titlePreview.length > 100) {
              return titlePreview.substr(0, 99) + "...";
            } else {
              return titlePreview;
            }
          },
          messageMethod: () => {
            const messagePreview = data.body.message;
            if (messagePreview.length > 400) {
              return messagePreview.substr(0, 350) + "...";
            } else {
              return messagePreview;
            }
          }
        },
        _id: data._id,
        date: data.createdAt
      };
      postData.push(post);
      previewData.push(previewPost);
    });
    state.posts = postData;
    state.previewPosts = previewData;
  },
  currentPost(state, payload) {
    const post = [
      {
        author: {
          name: payload.user.userName
        },
        body: {
          title: payload.body.title,
          message: payload.body.message
        },
        _id: payload._id
      }
    ];
    state.currentPost = post;
  },
  async updateHomePage(state, payload) {
    const post = {
      author: {
        name: payload.author.name
      },
      body: {
        title: payload.body.title,
        message: payload.body.message
      },
      _id: payload._id,
      date: payload.createdAt
    };
    const previewPost = {
      author: {
        name: payload.author.userName
      },
      body: {
        titleMethod: () => {
          const titlePreview = payload.body.title;
          if (titlePreview.length > 100) {
            return titlePreview.substr(0, 99) + "...";
          } else {
            return titlePreview;
          }
        },
        messageMethod: () => {
          const messagePreview = payload.body.message;
          if (messagePreview.length > 400) {
            return messagePreview.substr(0, 350) + "...";
          } else {
            return messagePreview;
          }
        }
      },
      _id: payload._id,
      date: payload.createdAt
    };
    await state.posts.unshift(post);
    await state.previewPosts.unshift(previewPost);
  },
  clearCache(state) {
    state.currentPost = [];
  }
};
