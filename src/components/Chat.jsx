/* eslint-disable*/
import { useState, useEffect }  from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  Sidebar,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
  ConversationList,
  Conversation,
  InputToolbox,
  ExpansionPanel,
  AttachmentButton,
  SendButton,
  Search,
} from '@chatscope/chat-ui-kit-react';

const API_KEY =process.env.REACT_APP_OPEN_AI_KEY

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Xin chào! Tôi là ChatGPT. Hãy đặt câu hỏi của bạn.",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "GPT-4o mini",
      "messages": [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

	return (
		<div className="App">
			<div className="row">
				<div className="col position-relative" style={{ height: "360px" }}>
					<MainContainer style={{border: 'none'}}>
						<ChatContainer >
            <MessageList typingIndicator={isTyping ? <TypingIndicator content="ChatGPT đang soạn tin nhắn" /> : null}>
            {messages.map((message, i) => (
              <Message
              key={i}
              model={{
                message: message.message,
                sentTime: message.sentTime,
                sender: message.sender,
                direction: message.sender === "ChatGPT" ? "incoming" : "outgoing",
                position: message.position, // Call the message in the State
              }}
              >
                <Avatar src={message.sender === "ChatGPT" ? 'https://cdn.prod.website-files.com/6411daab15c8848a5e4e0153/6476e947d3fd3c906c9d4da6_4712109.png' :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s' } />
              </Message>
            ))}
          </MessageList>
          <MessageInput placeholder="Hãy nhập câu hỏi của bạn..." onSend={handleSendRequest} />
						</ChatContainer>
					</MainContainer>
				</div>
			</div>
		</div>
	);
};

export default Chat;
