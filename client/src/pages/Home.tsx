import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { userLogout } from "@/redux/actions/user.action";
import { Skeleton } from "@/components/ui/skeleton";

const Home: React.FC = () => {
  const { loading, user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(userLogout());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="font-bold text-xl">
            ClearPath Prior Authorization
          </span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Features
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            About
          </a>
        </nav>
        <div className="flex items-center space-x-2">
          {loading ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : user?._id ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={user?.username || "User Avatar"}
                    />
                    <AvatarFallback>
                      {user?.username?.charAt(0)?.toUpperCase() || "CN"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Home</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/task")}>
                    Patient Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Sign in
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign up free</Button>
            </>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Streamlined Patient Health Dashboard for Prior Authorization
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Our Patient Health Dashboard supports healthcare teams and
            individual providers, ensuring everyone can stay organized and
            focused on managing prior authorizations efficiently.
          </p>
          <Button
            size="lg"
            className="mr-4"
            onClick={() => navigate("/signup")}
          >
            Start for free
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/task")}>
            Try Demo
          </Button>
        </section>

        <section className="py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Monitor real-time progress with Prior Authorization Reports.
              </h2>
              <p className="text-gray-600 mb-4">
                Gain clear insights into your productivity and prior
                authorization status with our comprehensive reporting tools.
              </p>
              <Button variant="outline" onClick={() => navigate("/task")}>
                Get Started
              </Button>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              {/* Placeholder for chart/graph */}
              <div className="h-64 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </section>

        <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">120K+</h3>
              <p className="text-gray-600">Happy customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">4.8</h3>
              <p className="text-gray-600">Average rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">100%</h3>
              <p className="text-gray-600">Satisfaction guaranteed</p>
            </CardContent>
          </Card>
        </section>

        {/* Add more sections as needed */}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Bordup</h4>
              <p className="text-sm text-gray-400">
                Attach your important task in here
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Guides
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
