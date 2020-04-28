"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = (appInfo) => {
    const config = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1587966355823_6909';
    // add your config here
    config.middleware = [];
    config.logger = {
        dir: path.join(appInfo.baseDir, 'logs', appInfo.name),
    };
    config.cluster = {
        listen: {
            port: 3000,
            hostname: '127.0.0.1'
        }
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQTZCO0FBRzdCLGtCQUFlLENBQUMsT0FBbUIsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQW1CLENBQUM7SUFFbkMsdUVBQXVFO0lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQztJQUVuRCx1QkFBdUI7SUFDdkIsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUNuQixDQUFDO0lBQ0YsTUFBTSxDQUFDLE1BQU0sR0FBRztRQUNkLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUM7S0FDdEQsQ0FBQTtJQUNELE1BQU0sQ0FBQyxPQUFPLEdBQUc7UUFDZixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxXQUFXO1NBQ3RCO0tBQ0YsQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyJ9