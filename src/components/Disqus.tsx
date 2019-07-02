import { CommentCount, DiscussionEmbed } from 'disqus-react';
import React, { ComponentProps } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const shortname = 'react-hot-starter-dev';

type DisqusConfig = ComponentProps<typeof CommentCount>['config'];

export interface DisqusProps extends RouteComponentProps {
  title?: DisqusConfig['title'];
  identifier?: DisqusConfig['identifier'];
}

const Disqus: React.FC<DisqusProps> = ({
  title,
  identifier,
  match: { url },
}) => {
  const disqusConfig = {
    url,
    title: title || url,
    identifier: identifier || url,
  };

  return (
    <>
      <CommentCount shortname={shortname} config={disqusConfig} />
      <DiscussionEmbed shortname={shortname} config={disqusConfig} />
    </>
  );
};
export default withRouter(Disqus);
