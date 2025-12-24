User
- email (string, unique)
- dob (string)
- username (string)
- bio (string)

Post
- userId (ObjectId → User)
- type (text | image | video | audio | poll)
- content
- mediaUrl
- createdAt
