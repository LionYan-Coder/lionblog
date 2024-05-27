import groq from 'groq';

export const getUserByIdQuery = groq`
  *[_type == $userSchema && _id == $id][0]
`;

export const getUserByProviderAccountIdQuery = groq`
  *[_type == $accountSchema && providerId == $providerId && providerAccountId == $providerAccountId] {
    accessToken,
    accessTokenExpires,
    providerId,
    providerType,
    providerAccountId,
    user->
  }[0]
`;

export const getUserByEmailQuery = groq`*[_type == $userSchema && email == $email][0]`;

export const getVerificationTokenQuery = groq`
  *[_type == $verificationTokenSchema && identifier == $identifier && token == $token][0]
`;

export const getSchemaCount = groq`
  count(*[_type == $schema ])
`;

export const getPostQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) [($page-1*$size)...($page*$size)]
  {
    _id,
    "slug": slug.current,
    title,
    publishedAt,
    coverImage {
      asset->{url,"lqip": metadata.lqip, "dominant": metadata.palette.dominant},
      alt
    },
    summary,
    tags[]->{title,color},
    author->{
      image {
        alt,
        asset->{url}
      },
      name,
      "slug": slug.current
    }
  }
`;

export const getPostBySlug = groq`
  *[_type=="post" && slug.current==$slug && !(_id in path("drafts.**"))] [0]  
  {
    _id,
    "slug": slug.current,
    title,
    publishedAt,
    coverImage {
      asset->{url,"lqip": metadata.lqip, "dominant": metadata.palette.dominant},
      alt
    },
    tags[]->{title,color},
    author->{
      image {
        alt,
        asset->{url}
      },
      name,
      "slug": slug.current
    },
    summary,
    content[] {
      ...,
      _type == "image" => {
        "url": asset->url,
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions,
        ...
      }
    },
    "headings": content[length(style) == 2 && string::startsWith(style, "h")],
  }
`;

export const getIdeaQuery = groq`
*[_type == "idea" && !(_id in path("drafts.**"))] | order(publishedAt desc) [($page-1*$size)...($page*$size)]
{
  _id,
  "slug": slug.current,
  title,
  publishedAt,
  coverImage {
    asset->{url,"lqip": metadata.lqip, "dominant": metadata.palette.dominant},
    alt
  },
  summary,
  tags[]->{title,color},
  author->{
    image {
      alt,
      asset->{url}
    },
    name,
    "slug": slug.current
  }
}
`;

export const getIdeaBySlug = groq`
*[_type=="idea" && slug.current==$slug && !(_id in path("drafts.**"))] [0]  
{
  _id,
  "slug": slug.current,
  title,
  publishedAt,
  coverImage {
    asset->{url,"lqip": metadata.lqip, "dominant": metadata.palette.dominant},
    alt
  },
  tags[]->{title,color},
  author->{
    image {
      alt,
      asset->{url}
    },
    name,
    "slug": slug.current
  },
  summary,
  content[] {
    ...,
    _type == "image" => {
      "url": asset->url,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions,
      ...
    }
  },
  "headings": content[length(style) == 2 && string::startsWith(style, "h")],
}
`;

export const getGuestbookQuery = groq`
*[_type == "guestbook" && !(_id in path("drafts.**"))] {
  _id,
  _createdAt,
  user->{name,image},
  message
}
`;
