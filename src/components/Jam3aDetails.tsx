
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface Participant {
  user_id: string;
  product_name: string;
  product_model?: string;
  joined_at: string;
}

interface Jam3aDetailsProps {
  name: string;
  currentParticipants: number;
  maxParticipants: number;
  endDate: string;
  startDate: string;
  participants: Participant[];
}

const Jam3aDetails = ({
  name,
  currentParticipants,
  maxParticipants,
  endDate,
  startDate,
  participants
}: Jam3aDetailsProps) => {
  const { language } = useLanguage();
  const endDateTime = new Date(endDate);
  const startDateTime = new Date(startDate);
  
  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {language === 'en' ? 'Jam3a Details' : 'تفاصيل الجمعة'}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-royal-blue" />
              <span>
                {language === 'en' 
                  ? `${currentParticipants} of ${maxParticipants} joined` 
                  : `${currentParticipants} من ${maxParticipants} انضموا`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-royal-blue" />
              <span>
                {language === 'en'
                  ? `Ends ${formatDistanceToNow(endDateTime, { addSuffix: true })}`
                  : `ينتهي ${formatDistanceToNow(endDateTime, { addSuffix: true })}`}
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-royal-blue h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentParticipants / maxParticipants) * 100}%` }}
            />
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">
              {language === 'en' ? 'Current Participants' : 'المشاركون الحاليون'}:
            </h4>
            <div className="space-y-2">
              {participants.map((participant, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{participant.product_name}</p>
                    {participant.product_model && (
                      <p className="text-sm text-muted-foreground">{participant.product_model}</p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(participant.joined_at), { addSuffix: true })}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? `Started ${formatDistanceToNow(startDateTime, { addSuffix: true })}` 
                : `بدأت ${formatDistanceToNow(startDateTime, { addSuffix: true })}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Jam3aDetails;
