  import React, { useState, useEffect, useCallback, useRef } from 'react';
  import { useParams, useLocation, useNavigate } from 'react-router-dom';
  import { ChevronRight, ChevronLeft, Users, MessageSquare, LogOut } from 'lucide-react';
  import { useWebSocket } from '../hooks/useWebSocket';
  import { useUserContext } from '../contexts/UserContext';
  import { PlayerAvatar } from '../components/PlayerAvatar';
  import { ChatHeader } from '../components/chat/ChatHeader';
  import { Message } from '../components/chat/Message';
  import { TypingIndicator } from '../components/chat/TypingIndicator';
  import { MessageInput } from '../components/chat/MessageInput';
  import { Button } from "@repo/ui/Button";
  import { WsMessage } from '../interfaces';

  const CELL_SIZE = 48;
  const MOVE_DELAY = 150;
  const GRID_WIDTH = 20;
  const GRID_HEIGHT = 15;

  const Room = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { sendMessage, addMessageHandler, removeMessageHandler } = useWebSocket();
    
    // Game State
    const [players, setPlayers] = useState(new Map());
    const [currentPlayer, setCurrentPlayer] = useState({
      x: location.state?.spawnPosition?.x || 0,
      y: location.state?.spawnPosition?.y || 0,
    });
    const lastMoveRef = useRef(Date.now());
    
    // UI State
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [isPlayerListOpen, setIsPlayerListOpen] = useState(false);
    const [messages, setMessages] = useState<any>([]);
    const [newMessage, setNewMessage] = useState('');
    const [typingUsers, setTypingUsers] = useState<{ user: string; avatar: string }[]>([]);
    const [showReactions, setShowReactions] = useState<number | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const typingTimeoutRef = useRef<NodeJS.Timeout>();
    const debouncedTypingRef = useRef<NodeJS.Timeout>();
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Initialize room with existing users
    useEffect(() => {
      if (!user) {
        navigate('/');
        return;
      }
      interface User {
        userId: string;
        x: number;
        y: number;
        username: string;
        avatarId: string;
      }

      const initialUsers : User[] = location.state?.users || [];
      const usersMap = new Map();
      initialUsers.forEach(user => {
        usersMap.set(user.userId, {
          x: user.x,
          y: user.y,
          username: user.username,
          avatarId: user.avatarId
        });
      });
      setPlayers(usersMap);
    }, [location.state, user, navigate]);

    // WebSocket message handlers
    useEffect(() => {
      const handleMessage = (message : WsMessage) => {
        switch (message.type) {
          case "user-joined":
            setPlayers(prev => {
              const newMap = new Map(prev);
              newMap.set(message.payload.userId, {
                x: message.payload.x,
                y: message.payload.y,
                username: message.payload.username,
                avatarId: message.payload.avatarId
              });
              return newMap;
            });
            break;

          case "user-left":
            setPlayers(prev => {
              const newMap = new Map(prev);
              newMap.delete(message.payload.userId);
              return newMap;
            });
            break;

          case "move":
            setPlayers(prev => {
              const newMap = new Map(prev);
              const player = newMap.get(message.payload.userId);
              if (player) {
                newMap.set(message.payload.userId, {
                  ...player,
                  x: message.payload.x,
                  y: message.payload.y,
                });
              }
              return newMap;
            });
            break;

          // case "chat":
          //   setMessages(prev => [...prev, {
          //     id: Date.now(),
          //     userId: message.payload.userId,
          //     username: message.payload.username,
          //     content: message.payload.content,
          //     timestamp: new Date().toISOString()
          //   }]);
          //   break;

          //   case "typing":
          //   if (message.payload.userId !== user?.id) {
          //     setTypingUsers(prev => {
          //       const userExists = prev.some(u => u.user === message.payload.username);
          //       if (message.payload.isTyping && !userExists) {
          //         return [...prev, { user: message.payload.username, avatar: "/api/placeholder/32/32" }];
          //       } else if (!message.payload.isTyping) {
          //         return prev.filter(u => u.user !== message.payload.username);
          //       }
          //       return prev;
          //     });
          //   }
          //   break;

          // case "reaction":
          //   setMessages(prev => prev.map(msg => {
          //     if (msg.id === message.payload.messageId) {
          //       return {
          //         ...msg,
          //         reactions: [...(msg.reactions || []), {
          //           emoji: message.payload.emoji,
          //           count: 1,
          //           users: [message.payload.username]
          //         }]
          //       };
          //     }
          //     return msg;
          //   }));
          //   break;
        }
      };

      addMessageHandler(handleMessage);
      return () => removeMessageHandler(handleMessage);
    }, [addMessageHandler, removeMessageHandler]);
    

    useEffect(() => {
      return () => {
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        if (debouncedTypingRef.current) clearTimeout(debouncedTypingRef.current);
      };
    }, []);

    // Movement validation
    const isValidMove = useCallback((newX: number, newY: number) => {
      return newX >= 0 && newX < GRID_WIDTH && newY >= 0 && newY < GRID_HEIGHT;
    }, []);

    const handleSendMessage = () => {
      if (!newMessage.trim() || !user) return;
  
      const newMsg = {
        id: Date.now(),
        content: newMessage,
        type: 'text',
        sender: user.username,
        avatar: "/api/placeholder/32/32",
        timestamp: new Date().toISOString(),
        reactions: []
      };
  
      setMessages((prev: any[]) => [...prev, newMsg]);  sendMessage({
        type: 'chat',
        payload: {
          content: newMessage,
          username: user.username
        }
      });
      setNewMessage('');
      setIsTyping(false);
      setTypingUsers([]);
  
      if (debouncedTypingRef.current) {
        clearTimeout(debouncedTypingRef.current);
      }
  
      scrollToBottom();
    };
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !user) return;
  
      try {
        // Handle image uploads
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            const newMsg = {
              id: Date.now(),
              content: reader.result,
              type: 'image',
              sender: user.username,
              avatar: "/api/placeholder/32/32",
              timestamp: new Date().toISOString(),
              reactions: []
            };
            
            setMessages((prev: any[]) => [...prev, newMsg]);  scrollToBottom();
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    const handleAddReaction = (messageId: number, emoji: string) => {
      interface Reaction {
        emoji: string;
        count: number;
        users: string[];
      }

      interface Message {
        id: number;
        content: string;
        type: string;
        sender: string;
        avatar: string;
        timestamp: string;
        reactions: Reaction[];
      }

      setMessages((messages: Message[]) =>
        messages.map((msg: Message) => {
          if (msg.id === messageId) {
            const reactions = msg.reactions || [];
            const existingReaction = reactions.find((r: Reaction) => r.emoji === emoji);

            if (existingReaction) {
              return {
                ...msg,
                reactions: reactions.map((r: Reaction) =>
                  r.emoji === emoji
                    ? { ...r, count: r.count + 1, users: [...r.users, user?.username || ''] }
                    : r
                )
              };
            }

            return {
              ...msg,
              reactions: [...reactions, { emoji, count: 1, users: [user?.username || ''] }]
            };
          }
          return msg;
        })
      );  setShowReactions(null);
  
      // Notify other users about the reaction via WebSocket
      sendMessage({
        type: 'reaction',
        payload: {
          messageId,
          emoji,
          username: user?.username
        }
      });
    };
  
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };
  

    // Handle keyboard movement
    useEffect(() => {
      const handleKeydown = (e: KeyboardEvent) => {
        if (!user) return;

        const now = Date.now();
        if (now - lastMoveRef.current < MOVE_DELAY) return;

        let newX = currentPlayer.x;
        let newY = currentPlayer.y;

        switch (e.key) {
          case 'ArrowUp':
            newY -= 1;
            break;
          case 'ArrowDown':
            newY += 1;
            break;
          case 'ArrowLeft':
            newX -= 1;
            break;
          case 'ArrowRight':
            newX += 1;
            break;
          default:
            return;
        }

        if (isValidMove(newX, newY)) {
          setCurrentPlayer(prev => ({
            ...prev,
            x: newX,
            y: newY,
          }));
          sendMessage({
            type: 'move',
            payload: { x: newX, y: newY }
          });
          lastMoveRef.current = now;
        }
      };

      window.addEventListener('keydown', handleKeydown);
      return () => window.removeEventListener('keydown', handleKeydown);
    }, [currentPlayer, user, sendMessage, isValidMove]);

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setNewMessage(newValue);
  
      if (debouncedTypingRef.current) {
        clearTimeout(debouncedTypingRef.current);
      }
  
      if (!isTyping) {
        setIsTyping(true);
        setTypingUsers([{ user: user?.username || "You", avatar: "/api/placeholder/32/32" }]);
      }
  
      debouncedTypingRef.current = setTimeout(() => {
        setIsTyping(false);
        setTypingUsers([]);
      }, 1200);
  
      // Notify other users about typing status via WebSocket
      sendMessage({
        type: 'typing',
        payload: { isTyping: true }
      });
    };

    const handleLeaveRoom = () => {
      navigate('/');
    };
    const handleReactionClick = (messageId: number) => {
      setShowReactions(showReactions === messageId ? null : messageId);
    };

    return (
      <div className="relative h-screen w-full overflow-hidden bg-[#1f2937]">
        {/* Game Grid */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            right: isChatOpen ? '30%' : 0,
            transition: 'right 0.3s ease-in-out'
          }}
        >
          <div 
            className="relative"
            style={{
              width: GRID_WIDTH * CELL_SIZE,
              height: GRID_HEIGHT * CELL_SIZE,
            }}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 grid"
              style={{
                gridTemplateColumns: `repeat(${GRID_WIDTH}, ${CELL_SIZE}px)`,
                gridTemplateRows: `repeat(${GRID_HEIGHT}, ${CELL_SIZE}px)`,
              }}
            >
              {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, i) => (
                <div key={i} className="border border-white/10 bg-[#2a3441]/50" />
              ))}
            </div>

            {/* Current Player */}
            <div
              className="absolute transition-all duration-150 z-10"
              style={{
                transform: `translate(${currentPlayer.x * CELL_SIZE}px, ${currentPlayer.y * CELL_SIZE}px)`,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            >
              <PlayerAvatar
                position={{ x: currentPlayer.x, y: currentPlayer.y }}
                age = {user?.age || 'Unknown'}
                gender={user?.gender || 'Unknown'}
                username={user?.username || 'You'}
                avatarId={user?.avatarId || 'polar-bear'}
                cellSize={CELL_SIZE}
              />
            </div>

            {/* Other Players */}
            {Array.from(players.entries()).map(([userId, player]) => (
              <div
                key={userId}
                className="absolute transition-all duration-150"
                style={{
                  transform: `translate(${player.x * CELL_SIZE}px, ${player.y * CELL_SIZE}px)`,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              >
                <PlayerAvatar
                  position={{ x: player.x, y: player.y }}
                  age={player?.age || 'Unknown'}
                  gender={player?.gender || 'Unknown'}
                  username={player.username}
                  avatarId={player.avatarId}
                  cellSize={CELL_SIZE}
                />
              </div>
            ))}
          </div>
        </div>

        {/* UI Controls */}
        <div className="absolute top-4 right-4 space-x-2">
          <Button
            className="bg-[#4fd1c5] hover:bg-[#3ac7bc] text-white"
            onClick={() => setIsPlayerListOpen(!isPlayerListOpen)}
          >
            <Users className="w-4 h-4 mr-2" />
            Players ({players.size + 1})
          </Button>

          <Button
            className="bg-[#4fd1c5] hover:bg-[#3ac7bc] text-white"
            onClick={handleLeaveRoom}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Leave Room
          </Button>
        </div>

        {/* Players List Modal */}
        {isPlayerListOpen && (
          <div className="absolute top-16 right-4 bg-[#2a3441] rounded-xl p-4 shadow-lg w-64">
            <h3 className="text-white font-bold mb-4 font-['Comic_Sans_MS']">Players in Room</h3>
            <div className="space-y-2">
              <div className="text-[#4fd1c5] font-['Comic_Sans_MS']">
                • You ({user?.username})
              </div>
              {Array.from(players.entries()).map(([userId, player]) => (
                <div key={userId} className="text-white font-['Comic_Sans_MS']">
                  • {player.username}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-[#4fd1c5] hover:bg-[#3ac7bc] text-white transition-all duration-300 rounded-l-lg"
          style={{ right: isChatOpen ? '30%' : 0 }}
        >
          {isChatOpen ? <ChevronRight /> : <ChevronLeft />}
        </button>

        {/* Chat Panel */}
        <div
          className={`fixed right-0 top-0 h-full bg-[#2a3441] border-l-2 border-[#374151] transition-all duration-300 ${
            isChatOpen ? 'w-[30%]' : 'w-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col h-full">
            <ChatHeader />
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message: any) => (
                <Message
                  key={message.id}
                  message={message}
                  onReactionClick={handleReactionClick}
                  showReactions={showReactions}
                  onAddReaction={handleAddReaction}
                />
              ))}

              <TypingIndicator typingUsers={typingUsers} />
            </div>

            <MessageInput
              newMessage={newMessage}
              onMessageChange={handleTyping}
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
            />
          </div>
        </div>
      </div>
    );
  };

  export default Room;