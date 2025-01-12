import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Position, RoomMap, Player } from '../types';
import { Message as MessageType, UserTyping } from '../interfaces';
import { MOCK_MESSAGES } from '../constants/chat';
import { createNewMessage, handleFileRead } from '../utils/messageHandlers';
import { ChatHeader } from '../components/chat/ChatHeader';
import { Message } from '../components/chat/Message';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { MessageInput } from '../components/chat/MessageInput';
import { getRoomMap } from '../constants/roomMaps';
import { useUserContext } from '../contexts/UserContext';
import { PlayerAvatar } from '../components/PlayerAvatar';

const CELL_SIZE = 32;
const MOVE_DELAY = 150;
const SCROLL_THRESHOLD = 300;

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveRef = useRef(Date.now());
  const userContext = useUserContext();
  const { user } = userContext;
  const [playerDirection, setPlayerDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  console.log(user);

  const { username, age, gender, avatarId } = user || {};
  
  // Room state
  const [roomMap, setRoomMap] = useState<RoomMap | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [gridOffset, setGridOffset] = useState(0);

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState<MessageType[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState<UserTyping[]>([]);
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const debouncedTypingRef = useRef<NodeJS.Timeout>();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize room and player
  useEffect(() => {
    const map = getRoomMap(roomId || '');
    if (!map) {
      navigate('/');
      return;
    }
    
    setRoomMap(map);
    setPlayer({
      id: 'current-player',
      name: 'Player',
      position: map.spawnPoint,
      avatarUrl: '/api/placeholder/32/32'
    });
  }, [roomId, navigate]);

  // Chat typing effects
  useEffect(() => {
    if (newMessage) {
      const typingTimeout = setTimeout(() => {
        setTypingUsers([{ user: "Alice", avatar: "/api/placeholder/32/32" }]);
      });

      return () => {
        clearTimeout(typingTimeout);
        setTypingUsers([]);
      };
    }
  }, [newMessage]);

  // Cleanup typing timeouts
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (debouncedTypingRef.current) clearTimeout(debouncedTypingRef.current);
    };
  }, []);

  // Handle scroll when player moves
  useEffect(() => {
    if (!containerRef.current || !player) return;

    const containerWidth = containerRef.current.offsetWidth;
    const playerPixelX = player.position.x * CELL_SIZE;
    const fromRight = containerWidth - playerPixelX;

    if (fromRight < SCROLL_THRESHOLD) {
      const newOffset = Math.min(
        (SCROLL_THRESHOLD - fromRight) / 2,
        (roomMap?.gridSize.width || 0) * CELL_SIZE - containerWidth
      );
      setGridOffset(Math.max(0, newOffset));
    } else if (playerPixelX < SCROLL_THRESHOLD) {
      setGridOffset(Math.max(0, gridOffset - 10));
    }
  }, [player?.position, roomMap?.gridSize.width]);

  // Movement validation
  const isValidMove = useCallback((pos: Position): boolean => {
    if (!roomMap) return false;
    
    if (pos.x < 0 || pos.y < 0 || 
        pos.x >= roomMap.gridSize.width || 
        pos.y >= roomMap.gridSize.height) {
      return false;
    }
    
    return !roomMap.staticElements.some(element => {
      const elementEndX = element.position.x + element.width;
      const elementEndY = element.position.y + element.height;
      
      return pos.x >= element.position.x && pos.x < elementEndX &&
             pos.y >= element.position.y && pos.y < elementEndY &&
             !element.walkable;
    });
  }, [roomMap]);

  // Handle keyboard movement
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!player || !roomMap) return;

      const now = Date.now();
      if (now - lastMoveRef.current < MOVE_DELAY) return;

      const newPos = { ...player.position };
      let newDirection = playerDirection;
      
      switch (e.key) {
        case 'ArrowUp':
          newPos.y = Math.max(0, player.position.y - 1);
          newDirection = 'up';
          break;
        case 'ArrowDown':
          newPos.y = Math.min(roomMap.gridSize.height - 1, player.position.y + 1);
          newDirection = 'down';
          break;
        case 'ArrowLeft':
          newPos.x = Math.max(0, player.position.x - 1);
          newDirection = 'left';
          break;
        case 'ArrowRight':
          newPos.x = Math.min(roomMap.gridSize.width - 1, player.position.x + 1);
          newDirection = 'right';
          break;
        default:
          return;
      }

      if (isValidMove(newPos)) {
        setPlayer(prev => prev ? { ...prev, position: newPos } : null);
        setPlayerDirection(newDirection);
        lastMoveRef.current = now;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [player, roomMap, isValidMove, playerDirection]);
  // Chat handlers
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewMessage(newValue);

    if (debouncedTypingRef.current) {
      clearTimeout(debouncedTypingRef.current);
    }

    if (!isTyping) {
      setIsTyping(true);
      setTypingUsers([{ user: "You", avatar: "/api/placeholder/32/32" }]);
    }

    debouncedTypingRef.current = setTimeout(() => {
      setIsTyping(false);
      setTypingUsers([]);
    }, 1200);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = createNewMessage(
        newMessage,
        "text",
        "You",
        "/api/placeholder/32/32",
        messages
      );
      setMessages([...messages, newMsg]);
      setNewMessage("");
      setIsTyping(false);
      setTypingUsers([]);
      
      if (debouncedTypingRef.current) {
        clearTimeout(debouncedTypingRef.current);
      }

      scrollToBottom();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileRead(
        file,
        (newMsg) => {
          setMessages([...messages, newMsg]);
          scrollToBottom();
        },
        messages
      );
    }
  };

  const handleReactionClick = (messageId: number) => {
    setShowReactions(showReactions === messageId ? null : messageId);
  };

  const handleAddReaction = (messageId: number, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find((r) => r.emoji === emoji);

          if (existingReaction) {
            return {
              ...msg,
              reactions: reactions.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, users: [...r.users, "You"] }
                  : r
              ),
            };
          }

          return {
            ...msg,
            reactions: [...reactions, { emoji, count: 1, users: ["You"] }],
          };
        }
        return msg;
      })
    );
    setShowReactions(null);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  if (!roomMap || !player) return null;

  return (
    <div className="flex h-screen bg-[#1f2937] overflow-hidden">
      {/* Game Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
      >
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{
            backgroundColor: roomMap.backgroundColor,
            backgroundImage: roomMap.backgroundImage ? `url(${roomMap.backgroundImage})` : undefined,
            transform: `translateX(-${gridOffset}px)`,
          }}
        >
          {/* Grid */}
          <div 
            className="absolute inset-0"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${roomMap.gridSize.width}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${roomMap.gridSize.height}, ${CELL_SIZE}px)`,
            }}
          >
            {Array.from({ length: roomMap.gridSize.width * roomMap.gridSize.height }).map((_, i) => (
              <div key={i} className="border border-white/5" />
            ))}
          </div>

          {/* Static Elements */}
          {roomMap.staticElements.map(element => (
            <div
              key={element.id}
              className="absolute transition-all duration-200"
              style={{
                left: element.position.x * CELL_SIZE,
                top: element.position.y * CELL_SIZE,
                width: element.width * CELL_SIZE,
                height: element.height * CELL_SIZE,
              }}
            >
              <img
                src={element.imageUrl}
                alt={element.type}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Player */}
          <PlayerAvatar
            position={player.position}
            direction={playerDirection}
            username={username || 'Guest'}
            age={String(age || 0)}  
            gender={gender || 'Unknown'}
            avatarId={avatarId || 'ninja'}
            cellSize={CELL_SIZE}
          />
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-[#4fd1c5] p-2 rounded-l-lg hover:bg-[#3ac7bc] transition-all duration-300"
        style={{ right: isChatOpen ? "30%" : "5%" }}
      >
        {isChatOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed right-0 top-0 h-full bg-[#1f2937] border-l-2 border-[#374151] transition-all duration-300 ${
          isChatOpen ? "w-[30%]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col h-full">
          <ChatHeader />

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message) => (
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
}