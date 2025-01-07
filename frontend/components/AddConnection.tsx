import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AddConnection: React.FC = () => {
    return (
        <Dialog>
            <div className="relative grow flex justify-center w-fit lg:max-w-2xl px-16 py-4 rounded-lg bg-gray-800/10 border border-gray-800/20 mx-auto lg:w-full z-40 shadow-[0_0px_20px_0px_rgba(121,137,236,0.25)]">
            <DialogTrigger asChild>
                <div className="relative grow flex justify-center w-fit px-8 py-2 rounded-lg bg-[#121212] border border-white/10 mx-auto hover:bg-white/10 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-600/30">
                    
                    <div className="w-full flex justify-center relative">
                    <div className="text-white/70 text-sm font-medium flex items-center justify-between px-4 py-1">
                        Add your server
                    </div>
                    </div>

                </div>
                </DialogTrigger></div>

            <DialogContent className="sm:max-w-[425px] bg-[#121212]/95 backdrop-blur-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white">Add Connection</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-white">Name</Label>
                        <Input 
                            id="name" 
                            placeholder="Connection name" 
                            className="bg-white/5 border-white/10 text-white focus:border-white/20" 
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="ipaddress" className="text-white">IP Address</Label>
                        <Input 
                            id="ipaddress" 
                            placeholder="192.168.1.1" 
                            className="bg-white/5 border-white/10 text-white focus:border-white/20" 
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="port" className="text-white">Port</Label>
                        <Input 
                            id="port" 
                            placeholder="8080" 
                            className="bg-white/5 border-white/10 text-white focus:border-white/20" 
                        />
                    </div>
                </div>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white">Add Node</Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddConnection;